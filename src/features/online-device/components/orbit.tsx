import React from "react";
import {
  AbsoluteCenter,
  Box,
  Heading,
  keyframes,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { getDevices } from "requests";
import { useMount } from "common/hooks";

const ROTATOR_SIZE_IN_EM = 30;
const ITEM_SIZE_IN_EM = 5;

const rotations = keyframes`
  to { transform: rotate(360deg) }
`;

const Rotator = styled.div`
  position: relative;
  width: ${ROTATOR_SIZE_IN_EM}em;
  height: ${ROTATOR_SIZE_IN_EM}em;
  animation: ${rotations} 6s linear infinite;
  border-radius: 50%;
`;

type CircleProps = {
  rot: number;
  circleSize: number;
  itemSize: number;
};
const Circle = styled.div<CircleProps>`
  position: absolute;
  display: block;
  height: ${(props) => props.itemSize + "em"};
  width: ${(props) => props.itemSize + "em"};
  margin: ${(props) => -(props.itemSize / 2) + "em"};
  border-radius: 50%;
  background-color: #ffffff;
  top: 50%;
  left: 50%;
  transform: ${(props) =>
    `rotate(${props.rot * 1}deg) translateX(${props.circleSize / 2}em) rotate(${
      props.rot * -1
    }deg)`};
`;

function Orbit() {
  const [itemCount, setItemCount] = React.useState(0);
  const angle = 360 / itemCount;
  const hasMounted = useMount();

  React.useEffect(() => {
    const timer = setInterval(() => {
      getDevices().then((data) => {
        hasMounted && setItemCount(data.devices.length);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [hasMounted]);

  return (
    <Box w="full" h="full" position="relative">
      <AbsoluteCenter>
        <Stack align="center" spacing={0}>
          <Heading as="h1" size="4xl" fontWeight="200">
            {itemCount}
          </Heading>
          <Text fontSize="sm" casing="uppercase" fontWeight="500">
            {`Device${itemCount > 1 ? "s" : ""}`}
          </Text>
          <Text fontSize="sm" casing="uppercase" fontWeight="500">
            Online
          </Text>
        </Stack>
      </AbsoluteCenter>
      <AbsoluteCenter>
        <Rotator data-testid="rotator">
          {Array(itemCount)
            .fill(0)
            .map((_, idx) => (
              <Circle
                key={idx}
                rot={angle * idx}
                circleSize={ROTATOR_SIZE_IN_EM}
                itemSize={ITEM_SIZE_IN_EM}
                data-testid="circle"
              />
            ))}
        </Rotator>
      </AbsoluteCenter>
    </Box>
  );
}

export default Orbit;
