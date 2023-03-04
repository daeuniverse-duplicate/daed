import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { DEFAULT_TCP_CHECK_URL, DEFAULT_UDP_CHECK_DNS, GET_LOG_LEVEL_STEPS } from "~/constants";

import NumberInput from "./NumberInput";

export type FormValues = {
  tproxyPort: number;
  logLevelIndex: number;
  tcpCheckUrl: string;
  udpCheckDns: string;
  checkIntervalMS: number;
  checkTolerenceMS: number;
  dnsUpstream: string;
  lanInterface: string[];
  lanNatDirect: boolean;
  wanInterface: string[];
  allowInsecure: boolean;
  dialMode: string;
};

const sliderLabelStyles = {
  mt: 2,
  ml: "-50%",
  w: "full",
  fontSize: "sm",
};

export default ({
  isOpen,
  onClose,
  submitHandler,
}: {
  isOpen: boolean;
  submitHandler: (values: FormValues) => Promise<void>;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const LOG_LEVEL_STEPS = GET_LOG_LEVEL_STEPS(t);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <form onSubmit={handleSubmit(submitHandler)}>
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>{t("config")}</ModalHeader>

          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>{t("global")}</Tab>
                <Tab>{t("dns")}</Tab>
                <Tab>{t("routing")}</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Flex direction="column" gap={4}>
                    <FormControl>
                      <FormLabel>{t("tproxyPort")}</FormLabel>

                      <Controller
                        name="tproxyPort"
                        control={control}
                        defaultValue={12345}
                        render={({ field }) => <NumberInput min={0} max={65535} {...field} />}
                      />
                    </FormControl>

                    <FormControl pb={4}>
                      <FormLabel>{t("logLevel")}</FormLabel>

                      <Controller
                        name="logLevelIndex"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <Slider max={LOG_LEVEL_STEPS.length - 1} textAlign="center" {...field}>
                            <>
                              {LOG_LEVEL_STEPS.map(([name], i) => (
                                <SliderMark key={i} value={i} {...sliderLabelStyles}>
                                  {name}
                                </SliderMark>
                              ))}
                            </>

                            <SliderTrack>
                              <SliderFilledTrack />
                            </SliderTrack>

                            <SliderThumb />
                          </Slider>
                        )}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>{t("tcpCheckUrl")}</FormLabel>

                      <Input defaultValue={DEFAULT_TCP_CHECK_URL} {...register("tcpCheckUrl")} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>{t("udpCheckDns")}</FormLabel>

                      <Input defaultValue={DEFAULT_UDP_CHECK_DNS} {...register("udpCheckDns")} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>{`${t("checkInterval")} (${t("ms")})`}</FormLabel>

                      <Controller
                        name="checkIntervalMS"
                        control={control}
                        defaultValue={1000}
                        render={({ field }) => <NumberInput min={0} {...field} />}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>{`${t("checkTolerance")} (${t("ms")})`}</FormLabel>

                      <Controller
                        name="checkTolerenceMS"
                        control={control}
                        defaultValue={1000}
                        render={({ field }) => <NumberInput min={0} {...field} />}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>{t("dnsUpstream")}</FormLabel>

                      <Input {...register("dnsUpstream")} />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>{t("lanInterface")}</FormLabel>

                      <Input {...register("lanInterface")} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>{t("lanNatDirect")}</FormLabel>

                      <Switch {...register("lanNatDirect")} />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>{t("wanInterface")}</FormLabel>

                      <Input {...register("wanInterface")} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>{t("allowInsecure")}</FormLabel>

                      <Switch {...register("allowInsecure")} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>{t("dialMode")}</FormLabel>

                      <Select {...register("dialMode")}>
                        <option>{t("ip")}</option>
                        <option>{t("domain")}</option>
                        <option>{t("domain+")}</option>
                      </Select>
                    </FormControl>
                  </Flex>
                </TabPanel>

                <TabPanel>
                  <Textarea />
                </TabPanel>

                <TabPanel>
                  <Textarea />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Flex gap={2}>
              <Button onClick={onClose}>{t("cancel")}</Button>

              <Button type="submit" isLoading={isSubmitting} bg="Highlight">
                {t("confirm")}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};