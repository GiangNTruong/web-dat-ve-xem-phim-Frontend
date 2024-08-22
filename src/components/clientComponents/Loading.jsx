import { Flex, Spin } from "antd";

export default function Loading()
{
  return (
    <>
      <div className="absolute top-[50%] left-[50%]">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    </>
  );
}
