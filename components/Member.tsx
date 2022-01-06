import { Avatar, Box, Text, FlexProps, Flex, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getAvatarURL, GuildMember } from "../lib/discord";

type Props = {
  member: GuildMember;
  constraintsRef: React.RefObject<Element>;
};

const MotionFlex = motion<FlexProps>(Flex);

export const Member = ({ member, constraintsRef }: Props) => {
  return (
    <MotionFlex
      w="30"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      drag
      dragConstraints={constraintsRef}
      cursor="grab"
    >
      <Avatar name={member.name} src={getAvatarURL(member)} />
      <Box ml="3">
        <Text fontWeight="bold">{member.name}</Text>
        <Badge ml="1" colorScheme="green">
          {member.bot ? "Bot" : "User"}
        </Badge>
      </Box>
    </MotionFlex>
  );
};
