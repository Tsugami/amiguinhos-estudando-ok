import type { NextPage, GetStaticProps } from "next";
import { useRef } from "react";

import { Member } from "../components/Member";
import { getGuildMembers, GuildMember } from "../lib/discord";
import { Container, Grid, GridItem } from "@chakra-ui/react";

interface ServerPropsResult {
  members: GuildMember[];
}

export const getStaticProps: GetStaticProps<ServerPropsResult> = async () => {
  const result = await getGuildMembers();

  return {
    props: {
      members: result,
    },
    revalidate: 60,
  };
};

const Home: NextPage<ServerPropsResult> = ({ members }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <Container maxW="container.lg" py={14} minH="container.sm">
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={6}
        ref={constraintsRef}
      >
        {members.map((member) => (
          <GridItem key={member.id}>
            <Member member={member} constraintsRef={constraintsRef} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
