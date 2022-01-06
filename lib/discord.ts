import type {
  RESTGetAPIGuildMembersResult,
  APIGuildMember,
} from 'discord-api-types/v9';

export type GuildMember = {
  avatar: string | null;
  discriminator: number;
  id: string;
  name: string;
};

const API_URL = 'https://discord.com/api/v9' as const;
const CDN_URL = 'https://cdn.discordapp.com' as const;

export const getGuildMembers = async () => {
  const guildID = process.env.DISCORD_GUILD_ID;
  const botToken = process.env.DISCORD_TOKEN;
  const uri = `${API_URL}/guilds/${guildID}/members?limit=100`;

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
    const { user } = member;
    if (!user || user.bot) return acc;

    const newMember: GuildMember = {
      avatar: member.avatar ?? user.avatar,
      discriminator: parseInt(user.discriminator, 10),
      id: user.id,
      name: member.nick || user.username || 'Unknown',
    };

    acc.push(newMember);

    return acc;
  }, []);
};
export const getAvatarURL = (member: GuildMember): string => {
  if (member.avatar) {
    return `${CDN_URL}/avatars/${member.id}/${member.avatar}.png`;
  }
  return `${CDN_URL}/embed/avatars/${member.discriminator % 5}.png`;
};
