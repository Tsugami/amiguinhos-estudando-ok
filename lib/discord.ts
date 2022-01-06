import type {
  RESTGetAPIGuildMembersResult,
  APIGuildMember,
} from "discord-api-types";

export type GuildMember = {
  name: string;
  id: string;
  avatar: string;
  bot: boolean;
};

export const getGuildMembers = async () => {
  const guildID = process.env.DISCORD_GUILD_ID;
  const botToken = process.env.DISCORD_TOKEN;
  const base_url = "https://discord.com/api/v9";
  const uri = `${base_url}/guilds/${guildID}/members?limit=100`;

  const res = await fetch(uri, {
    headers: {
      Authorization: `Bot ${botToken}`,
    },
  });

  const data = await res.json();

  if (data?.message) {
    throw new Error(data.message);
  }

  return normalizeResults(data as RESTGetAPIGuildMembersResult);
};

const normalizeResults = (results: APIGuildMember[]): GuildMember[] => {
  return results.reduce<GuildMember[]>((acc, member) => {
    const user = member.user;
    if (!user || user.bot) return acc;

    const newMember: GuildMember = {
      name: member.nick || user.username || "Unknown",
      id: user.id,
      avatar: user.avatar ?? "",
      bot: false,
    };

    acc.push(newMember);

    return acc;
  }, []);
};

export const getAvatarURL = (member: GuildMember) => {
  return `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`;
};
