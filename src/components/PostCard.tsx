// @ts-nocheck
'use client'
import React from 'react';
import { Flag, Trophy, Shield, Swords, Zap, Target, Crown, Flame } from 'lucide-react';
import { TrophyBadge } from '@/components/TrophyBadge';
import { RankBadge } from '@/components/RankBadge';
const ironIcon = '/assets/56c86ec8d49dc5439b990f985a6f4be72f5bde60.png';
const bronzeIcon = '/assets/76c991537ef52da8c2515e7316b6070625d76309.png';
const silverIcon = '/assets/572ffcd7047b7654d8b08685d6b6b4850a76fa4a.png';
const goldIcon = '/assets/447bec941d7526f11817bb66461d064ce59f5f48.png';
const platinumIcon = '/assets/951dc9449bd0843f7caa55a73bcfea5b40620965.png';
const emeraldIcon = '/assets/2ad3dca7cb7c74805ef5824f8dea9db9b9cce06c.png';
const diamondIcon = '/assets/848422b6f23bf3791285194b26d780ee89cec35d.png';
const masterIcon = '/assets/8ffdaf21013b18ddacb683f57d89491499994956.png';
const grandmasterIcon = '/assets/25ac6ba24944dfdc7a6273015725d30e86cc831c.png';
const challengerIcon = '/assets/3b18a1b73fd7fb4417ab4dba05421862984edbbe.png';
const challengerFrame = '/assets/22f917544818e8a3e7ce39dfc530fbeede2b285e.png';
const ironFrame = '/assets/324ba9a8fb4466f4adbe9a438bc24295d6cd4997.png';
const bronzeFrame = '/assets/c2b38520d916c807edfdf768bc59575b69705e21.png';
const silverFrame = '/assets/d17b1761afdeddef07672a0ffeabf4b4b39a7057.png';
const goldFrame = '/assets/8832c538bccbb18bcbad7901c8502146469bb8c5.png';
const platinumFrame = '/assets/4e8511ac4a2de838747e9fc558bfdc6a540ce6be.png';
const emeraldFrame = '/assets/5693eaded569d64ced22a70c6513b58ead46c8ee.png';
const diamondFrame = '/assets/c826558793a340e50473ec56508a9696e411c63d.png';
const masterFrame = '/assets/1c38d49180f509550e3f244e01de96ddbbe51ded.png';
const grandmasterFrame = '/assets/5a106dc2bd5ab593a2d97f37cce89ae65fd8613d.png';
const jungleIcon = '/assets/7b11ea7d8371325e20ddfbd658224f59be9f878c.png';
const topIcon = '/assets/b3822ba7bf22deb709c7ad81e24c04204d4935e8.png';
const midIcon = '/assets/6e8cd7cd6c53365c5d6a8c1dc00fe08bd8ca11e5.png';
const adcIcon = '/assets/5cc6482a3af5bf24376a874572318db0a0718b9c.png';
const supportIcon = '/assets/5ae58bb1e0fcdc1efa7baa6cd12c26732f85f058.png';
const lolLogo = '/assets/f9c7834eeb985de379e1ffa993c6e066e49c8aa0.png';
const clashLogo = '/assets/9ec3b1a9a2043361973b94eb0efd4e78f52d8ba7.png';
const aramLogo = '/assets/fb115a3033de860a3207e6e388e2ed1a772e92d3.png';
const riotVerifiedLogo = '/assets/81e33c50637591002b2fd2c5cac4c20635e0b0d9.png';
const statusOnline = "/assets/89acff5e3f002bca6acbad8bdee1a214d46ccb3f.png";
const statusBusy = "/assets/413093ab215ae8d33c2f5f1e67792773d08b8f4e.png";
const statusOffline = "/assets/a9647b068cbf551f7448b9bb446d6d970434682f.png";

interface Tag {
  text: string;
  bg: string;
  color: string;
}

interface Post {
  id: number;
  initials: string;
  color: string;
  username: string;
  time: string;
  content: string;
  tags: Tag[];
  riotVerified?: boolean;
  avatar?: string;
  banner?: string;
  joinDate?: string;
  language?: string; // Language of the post (for filtering)
  userLanguages?: string[]; // User's account languages (for displaying flags)
  userNameColor?: string;
  userProfileBackground?: string;
  userPostBackground?: string;
  isPremium?: boolean; // Premium status
  image?: string; // Post image/GIF URL
  imageZoom?: number; // Image zoom level
  imagePositionX?: number; // Image horizontal position
  imagePositionY?: number; // Image vertical position
  userPostBorder?: string; // Custom border style
  tournamentEarnings?: number; // Total tournament prize earnings in EUR
  tournamentName?: string; // Name of the biggest tournament won
}

interface PostCardProps {
  post: Post;
  currentPage: string;
  onProfileClick: (profile: {
    username: string;
    initials: string;
    color: string;
    rank: string;
    mainRole: string;
    region: string;
    riotVerified: boolean;
    avatar?: string;
    banner?: string;
    joinDate?: string;
    userNameColor?: string;
    userProfileBackground?: string;
    isPremium?: boolean;
    tournamentEarnings?: number;
    tournamentName?: string;
  }) => void;
  onMessageClick: (username: string, initials: string, color: string) => void;
  onReportClick?: (postId: number, author: string, content: string) => void;
  onReportProfile?: (username: string, avatarUrl?: string, bannerUrl?: string) => void;
  userName?: string;
  userStatus?: 'online' | 'busy' | 'offline';
  getUserStatus?: (username: string) => 'online' | 'busy' | 'offline' | null;
}

export function PostCard({ post, currentPage, onProfileClick, onMessageClick, onReportClick, onReportProfile, userName, userStatus, getUserStatus }: PostCardProps) {
  const rankTag = post.tags.find(tag =>
    ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'].some(r => tag.text.includes(r))
  );
  const roleTag = post.tags.find(tag =>
    ['Top', 'Jungle', 'Mid', 'ADC', 'Support'].includes(tag.text)
  );

  // Determine the status to display for this post's author
  const postAuthorStatus = userName === post.username ? userStatus : (getUserStatus ? getUserStatus(post.username) : null);

  // Map language to flag emoji
  const getLanguageFlag = (lang?: string) => {
    const flags: Record<string, string> = {
      en: '🇬🇧', de: '🇩🇪', fr: '🇫🇷', es: '🇪🇸', it: '🇮🇹',
      nl: '🇳🇱', pl: '🇵🇱', cs: '🇨🇿', hu: '🇭🇺', bg: '🇧🇬',
      ro: '🇷🇴', el: '🇬🇷', tr: '🇹🇷', pt: '🇵🇹', sv: '🇸🇪',
      da: '🇩🇰', fi: '🇫🇮', no: '🇳🇴', sk: '🇸🇰', hr: '🇭🇷',
      sl: '🇸🇮', sr: '🇷🇸', uk: '🇺🇦', ru: '🇷🇺'
    };
    return lang ? flags[lang] || '🌍' : '🌍';
  };

  const handleClick = () => {
    onProfileClick({
      username: post.username,
      initials: post.initials,
      color: post.color,
      rank: rankTag?.text || 'Unranked',
      mainRole: roleTag?.text || 'Not set',
      region: currentPage === 'eune' ? 'EUNE' : 'EUW',
      riotVerified: post.riotVerified || false,
      avatar: post.avatar,
      banner: post.banner,
      joinDate: post.joinDate || 'N/A',
      userNameColor: post.userNameColor,
      userProfileBackground: post.userProfileBackground,
      isPremium: post.isPremium,
      tournamentEarnings: post.tournamentEarnings,
      tournamentName: post.tournamentName
    });
  };

  const handleMessageClick = () => {
    onMessageClick(post.username, post.initials, post.color);
  };

  const handleReportClick = () => {
    if (onReportClick) {
      onReportClick(post.id, post.username, post.content);
    }
  };

  // Get rank color and icon
  const getRankStyle = (rankText: string) => {
    if (rankText.includes('Iron')) return { gradient: 'from-[#6b5d56] to-[#4a3f3a]', icon: Shield, customIcon: ironIcon };
    if (rankText.includes('Bronze')) return { gradient: 'from-[#cd7f32] to-[#8b4513]', icon: Shield, customIcon: bronzeIcon };
    if (rankText.includes('Silver')) return { gradient: 'from-[#c0c0c0] to-[#808080]', icon: Shield, customIcon: silverIcon };
    if (rankText.includes('Gold')) return { gradient: 'from-[#ffd700] to-[#daa520]', icon: Crown, customIcon: goldIcon };
    if (rankText.includes('Platinum')) return { gradient: 'from-[#00d4ff] to-[#00b8e6]', icon: Crown, customIcon: platinumIcon };
    if (rankText.includes('Emerald')) return { gradient: 'from-[#50C878] to-[#00A86B]', icon: Crown, customIcon: emeraldIcon };
    if (rankText.includes('Diamond')) return { gradient: 'from-[#b9f2ff] to-[#00d4ff]', icon: Crown, customIcon: diamondIcon };
    if (rankText.includes('Master')) return { gradient: 'from-[#e100ff] to-[#b300cc]', icon: Flame, customIcon: masterIcon };
    if (rankText.includes('Grandmaster')) return { gradient: 'from-[#ff4444] to-[#cc0000]', icon: Flame, customIcon: grandmasterIcon };
    if (rankText.includes('Challenger')) return { gradient: 'from-[#f4c430] to-[#ffaa00]', icon: Flame, customIcon: challengerIcon };
    return { gradient: 'from-white/10 to-white/5', icon: Shield, customIcon: null };
  };

  // Get role icon
  const getRoleIcon = (roleText: string) => {
    if (roleText === 'Top') return { icon: Shield, customIcon: topIcon };
    if (roleText === 'Jungle') return { icon: Swords, customIcon: jungleIcon };
    if (roleText === 'Mid') return { icon: Zap, customIcon: midIcon };
    if (roleText === 'ADC') return { icon: Target, customIcon: adcIcon };
    if (roleText === 'Support') return { icon: Shield, customIcon: supportIcon };
    return null;
  };

  const rankStyle = rankTag ? getRankStyle(rankTag.text) : null;

  const animatedBorders: Record<string, React.CSSProperties> = {
    rainbow: { background: 'linear-gradient(90deg, #ff0080, #ff8c00, #ffe500, #00ff80, #00d4ff, #a855f7, #ff0080)', backgroundSize: '300% 300%', animation: 'rainbowBorder 3s linear infinite', boxShadow: '0 0 25px rgba(168,85,247,0.5)' },
    fire:    { background: 'linear-gradient(90deg, #ff4500, #ff8c00, #ffd700, #ff4500)', backgroundSize: '300% 300%', animation: 'rainbowBorder 2s linear infinite', boxShadow: '0 0 25px rgba(255,100,0,0.5)' },
    aurora:  { background: 'linear-gradient(90deg, #00d4ff, #a855f7, #ec4899, #00d4ff)', backgroundSize: '300% 300%', animation: 'rainbowBorder 4s linear infinite', boxShadow: '0 0 25px rgba(168,85,247,0.4)' },
  };
  const staticBorders: Record<string, React.CSSProperties> = {
    default:      { borderColor: 'rgba(0,212,255,0.3)', boxShadow: '0 25px 50px -12px rgba(0,212,255,0.2)' },
    gold:         { borderColor: 'rgba(200,155,60,0.8)', boxShadow: '0 0 20px rgba(200,155,60,0.4)' },
    silver:       { borderColor: 'rgba(192,192,192,0.7)', boxShadow: '0 0 20px rgba(192,192,192,0.3)' },
    purple:       { borderColor: 'rgba(168,85,247,0.8)', boxShadow: '0 0 20px rgba(168,85,247,0.4)' },
    red:          { borderColor: 'rgba(239,68,68,0.8)', boxShadow: '0 0 20px rgba(239,68,68,0.4)' },
    green:        { borderColor: 'rgba(34,197,94,0.8)', boxShadow: '0 0 20px rgba(34,197,94,0.4)' },
    pink:         { borderColor: 'rgba(236,72,153,0.8)', boxShadow: '0 0 20px rgba(236,72,153,0.4)' },
    orange:       { borderColor: 'rgba(249,115,22,0.8)', boxShadow: '0 0 20px rgba(249,115,22,0.4)' },
    glow:         { borderColor: 'rgba(0,212,255,0.9)', boxShadow: '0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.3)' },
    'glow-gold':  { borderColor: 'rgba(200,155,60,0.9)', boxShadow: '0 0 30px rgba(200,155,60,0.7), 0 0 60px rgba(200,155,60,0.3)' },
    'glow-purple':{ borderColor: 'rgba(168,85,247,0.9)', boxShadow: '0 0 30px rgba(168,85,247,0.7), 0 0 60px rgba(168,85,247,0.3)' },
    'glow-green': { borderColor: 'rgba(34,197,94,0.9)', boxShadow: '0 0 30px rgba(34,197,94,0.7), 0 0 60px rgba(34,197,94,0.3)' },
    'glow-red':   { borderColor: 'rgba(239,68,68,0.9)', boxShadow: '0 0 30px rgba(239,68,68,0.7), 0 0 60px rgba(239,68,68,0.3)' },
    'glow-pink':  { borderColor: 'rgba(236,72,153,0.9)', boxShadow: '0 0 30px rgba(236,72,153,0.7), 0 0 60px rgba(236,72,153,0.3)' },
    none:         { border: 'none' },
  };
  const border = post.userPostBorder || 'default';
  const isAnimatedBorder = border in animatedBorders;
  const bgStyle: React.CSSProperties = post.image
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${post.image})`, backgroundSize:`${post.imageZoom||100}%`, backgroundPosition:`${post.imagePositionX||50}% ${post.imagePositionY||50}%`, backgroundRepeat:'no-repeat' }
    : post.userPostBackground?.startsWith('CUSTOM:')
    ? { background: post.userPostBackground.replace('CUSTOM:','') }
    : {};

  const cardBgClass = !post.image && !post.userPostBackground?.startsWith('CUSTOM:')
    ? `bg-gradient-to-br ${post.userPostBackground || 'from-[#0a0e27]/95 via-[#1a1d29]/90 to-[#0a0e27]/95'}`
    : '';

  return (
    <div className="group relative max-w-3xl mx-auto">
      {/* Outer glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff]/20 via-[#00b8e6]/20 to-[#00d4ff]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

      {/* Border wrapper: gradient wrapper for animated, passthrough for static */}
      <div
        className={isAnimatedBorder ? "rounded-2xl p-[3px]" : ""}
        style={isAnimatedBorder ? animatedBorders[border] : {}}
      >
        {/* Main Card */}
        <div
          className={`relative ${isAnimatedBorder ? "rounded-[13px]" : "rounded-2xl border-[4px]"} overflow-hidden shadow-2xl backdrop-blur-sm ${cardBgClass}`}
          style={{
            ...bgStyle,
            ...(isAnimatedBorder ? {} : (staticBorders[border] || staticBorders.default)),
          }}
        >
        {/* Country Flags - Top Right Corner (User's Languages) */}
        {post.userLanguages && post.userLanguages.length > 0 && (
          <div className="absolute top-4 right-4 z-30 flex gap-1">
            {post.userLanguages.map((lang, index) => (
              <span key={index} className="text-2xl leading-none" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
                {getLanguageFlag(lang)}
              </span>
            ))}
          </div>
        )}

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(0,212,255,0.05)_50%,transparent_100%)] animate-pulse" />
        </div>

        {/* Glow effects for verified users */}
        {post.riotVerified && (
          <>
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00d4ff]/10 rounded-full z-0 animate-pulse blur-3xl" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#00b8e6]/10 rounded-full z-0 animate-pulse blur-2xl delay-300" />
          </>
        )}

        <div className="relative z-10 p-14">
          {/* Top Section - Avatar + Username on same row */}
          <div className="flex items-start gap-6 pb-6 relative">

            
            {/* Avatar with Rank Frame */}
            <button
              onClick={handleClick}
              className="group/avatar relative flex-shrink-0 mt-2"
            >
              {/* Rank Frames - ONLY for Riot Verified users with rank tags */}
              {post.riotVerified && rankTag?.text.includes('Iron') && (
                <div className="absolute -inset-10 -top-10 z-20 pointer-events-none flex items-center justify-center">
                  <img 
                    src={ironFrame} 
                    alt="Iron Frame" 
                    className="w-[90px] h-[90px] object-contain" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Bronze') && (
                <div className="absolute -inset-10 -top-10 z-20 pointer-events-none flex items-center justify-center">
                  <img 
                    src={bronzeFrame} 
                    alt="Bronze Frame" 
                    className="w-[100px] h-[100px] object-contain" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Silver') && (
                <div className="absolute -inset-10 z-20 pointer-events-none flex items-center justify-center" style={{ top: '-2.125rem' }}>
                  <img 
                    src={silverFrame} 
                    alt="Silver Frame" 
                    className="w-[110px] h-[110px] object-contain" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Gold') && (
                <div className="absolute -inset-10 -top-10 z-20 pointer-events-none flex items-center justify-center">
                  <img 
                    src={goldFrame} 
                    alt="Gold Frame" 
                    className="w-[115px] h-[115px] object-contain" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Platinum') && (
                <div className="absolute -inset-10 -top-9 z-20 pointer-events-none flex items-center justify-center">
                  <img 
                    src={platinumFrame} 
                    alt="Platinum Frame" 
                    className="w-[115px] h-[115px] object-contain" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Emerald') && (
                <div className="absolute -inset-10 -top-13 z-20 pointer-events-none flex items-center justify-center">
                  <img 
                    src={emeraldFrame} 
                    alt="Emerald Frame" 
                    className="w-[130px] h-[130px] object-contain" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Diamond') && (
                <div className="absolute -inset-10 z-20 pointer-events-none flex items-center justify-center" style={{ top: '-3.375rem' }}>
                  <img 
                    src={diamondFrame} 
                    alt="Diamond Frame" 
                    className="w-[140px] h-[140px] object-contain" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Master') && (
                <div className="absolute -inset-10 -top-12 z-20 pointer-events-none flex items-center justify-center">
                  <img 
                    src={masterFrame} 
                    alt="Master Frame" 
                    className="w-[120px] h-[120px] object-contain animate-pulse" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Grandmaster') && (
                <div className="absolute -inset-10 z-20 pointer-events-none flex items-center justify-center" style={{ top: '-4.625rem' }}>
                  <img 
                    src={grandmasterFrame} 
                    alt="Grandmaster Frame" 
                    className="w-[140px] h-[140px] object-contain animate-pulse" 
                  />
                </div>
              )}
              {post.riotVerified && rankTag?.text.includes('Challenger') && (
                <div className="absolute -inset-10 -top-22 z-20 pointer-events-none flex items-center justify-center">
                  <img 
                    src={challengerFrame} 
                    alt="Challenger Frame" 
                    className="w-[140px] h-[140px] object-contain animate-pulse" 
                  />
                </div>
              )}
              
              {/* Avatar glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4ff]/0 via-[#00d4ff]/30 to-[#00d4ff]/0 blur-md opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
              
              {rankTag ? (
                <RankBadge rank={rankTag.text} size="small">
                  {post.avatar ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 group-hover/avatar:border-[#00d4ff]/80 transition-all duration-300 group-hover/avatar:scale-110 shadow-xl shadow-[#00d4ff]/20">
                      <img src={post.avatar} alt={post.username} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-14 h-14 rounded-full ${post.color} flex items-center justify-center text-white font-bold text-lg border-2 border-white/20 group-hover/avatar:border-[#00d4ff]/80 transition-all duration-300 group-hover/avatar:scale-110 shadow-xl shadow-[#00d4ff]/20`}>
                      {post.initials}
                    </div>
                  )}
                </RankBadge>
              ) : (
                post.avatar ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 group-hover/avatar:border-[#00d4ff]/80 transition-all duration-300 group-hover/avatar:scale-110 shadow-xl shadow-[#00d4ff]/20">
                    <img src={post.avatar} alt={post.username} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-14 h-14 rounded-full ${post.color} flex items-center justify-center text-white font-bold text-lg border-2 border-white/20 group-hover/avatar:border-[#00d4ff]/80 transition-all duration-300 group-hover/avatar:scale-110 shadow-xl shadow-[#00d4ff]/20`}>
                    {post.initials}
                  </div>
                )
              )}
            </button>
            
            {/* Username + Riot Verified + Rank & Role Tags */}
            <div className="flex-1 ml-8">
              {/* Username + Riot Verified */}
              <button onClick={handleClick} className="flex items-center gap-2 group/name mb-3">
                {post.userNameColor ? (
                  post.userNameColor.startsWith('CUSTOM:') ? (
                    <h3
                      className="font-bold text-2xl bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 tracking-tight"
                      style={{ backgroundImage: post.userNameColor.replace('CUSTOM:', '') }}
                    >
                      {post.username}
                    </h3>
                  ) : (
                    <h3 className={`font-bold text-2xl bg-gradient-to-r ${post.userNameColor} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 tracking-tight`}>
                      {post.username}
                    </h3>
                  )
                ) : (
                  <h3 className="text-white font-bold text-2xl group-hover/name:text-[#00d4ff] transition-colors duration-300 tracking-tight">
                    {post.username}
                  </h3>
                )}
                {post.riotVerified && (
                  <>
                    <img src={riotVerifiedLogo} alt="Riot Verified" className="w-5 h-5 object-contain ml-2" />
                    <span className="text-[#00d4ff] font-bold text-sm">Riot Verified</span>
                  </>
                )}
                {post.isPremium && (
                  <div className="ml-2 px-2 py-1 bg-gradient-to-r from-[#c89b3c] to-[#00d4ff] rounded-md flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-bold text-xs">FinderQ</span>
                  </div>
                )}
              </button>
              
              {/* Rank + Role Tags Row */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Rank Small Tag - ONLY for Riot Verified users */}
                {post.riotVerified && rankTag && (
                  <div className="relative group/rank">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/20 to-[#00b8e6]/20 rounded-lg blur-md opacity-0 group-hover/rank:opacity-100 transition-opacity duration-300" />
                    <div className="relative inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-[#00d4ff]/15 to-[#00b8e6]/10 border-2 border-[#00d4ff]/40 hover:border-[#00d4ff]/70 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00d4ff]/20">
                      {(() => {
                        const rankStyle = getRankStyle(rankTag.text);
                        if (rankStyle.customIcon) {
                          return <img src={rankStyle.customIcon} alt="Rank" className="w-8 h-8 object-contain" />;
                        }
                        const RankIcon = rankStyle.icon;
                        return <RankIcon className="w-5 h-5 text-[#00d4ff]" />;
                      })()}
                      <span className="text-[#00d4ff] text-sm font-bold tracking-wide">{rankTag.text}</span>
                    </div>
                  </div>
                )}
                
                {/* Role Tag - ONLY for Riot Verified users */}
                {post.riotVerified && roleTag && (() => {
                  const roleIconData = getRoleIcon(roleTag.text);
                  return roleIconData && (
                    <div className="relative group/role">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-md opacity-0 group-hover/role:opacity-100 transition-opacity duration-300" />
                      <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/15 to-pink-500/10 border-2 border-purple-500/40 hover:border-purple-500/70 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20">
                        {roleIconData.customIcon ? (
                          <img src={roleIconData.customIcon} alt="Role" className="w-5 h-5 object-contain" />
                        ) : (
                          <roleIconData.icon className="w-5 h-5 text-purple-300" />
                        )}
                        <span className="text-purple-300 text-sm font-bold tracking-wide">{roleTag.text}</span>
                      </div>
                    </div>
                  );
                })()}

              </div>

              {/* Trophy Badge - below rank/role tags */}
              {post.tournamentEarnings !== undefined && post.tournamentEarnings >= 5 && (
                <div className="mt-2">
                  <TrophyBadge earnings={post.tournamentEarnings} size="small" showAmount={true} tournamentName={post.tournamentName} />
                </div>
              )}
            </div>
          </div>

          {/* Separator - below Teemo feet */}
          <div className="relative mb-6 mt-8 h-[2px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
          </div>

          {/* Middle Section - Description */}
          <div className="py-6 mb-6 border-b-2 border-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent relative">
            {/* Animated border shine */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-150" />
            
            {/* Description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-8 bg-gradient-to-r from-[#00d4ff] to-transparent rounded-full" />
                <h4 className="text-[#00d4ff] text-sm font-black uppercase tracking-widest">LOOKING FOR</h4>
              </div>
              <p className="text-white/95 text-base leading-relaxed whitespace-pre-wrap font-medium">
                {post.content}
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-6">
            {/* Left Side - Time + Clash Tags */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00d4ff]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white/60 text-sm font-medium">{post.time}</p>
              </div>
              <div className="w-[2px] h-4 bg-[#00d4ff]/20" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => {
                  const isRankTag = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'].some(r => tag.text.includes(r));
                  const isRoleTag = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'].includes(tag.text);
                  
                  if (isRankTag || isRoleTag) {
                    return null;
                  }
                  
                  // Check if this tag is a League of Legends game mode
                  const isLoLGameMode = ['Ranked Solo/Duo', 'Ranked Flex', 'Normal Draft', 'SwiftPlay', 'Normal Games', 'ARAM', 'Clash', 'Mayhem'].includes(tag.text);
                  
                  return (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#a855f7]/60 to-[#ec4899]/60 border border-[#a855f7]/80 shadow-lg hover:shadow-xl hover:shadow-[#a855f7]/30 transition-all duration-300 hover:scale-105"
                    >
                      {isLoLGameMode && (
                        <img src={tag.text === 'Clash' ? clashLogo : (tag.text === 'ARAM' || tag.text === 'Mayhem') ? aramLogo : lolLogo} alt={tag.text === 'Clash' ? 'Clash' : (tag.text === 'ARAM' || tag.text === 'Mayhem') ? tag.text : 'LoL'} className="w-5 h-5 object-contain" />
                      )}
                      <span className="text-white font-bold text-sm">{tag.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Action Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReportClick}
                className="w-10 h-10 bg-red-500/40 hover:bg-red-500/70 rounded-full flex items-center justify-center transition-all duration-300 group/btn border-2 border-red-500/70 hover:border-red-500 hover:scale-110 shadow-lg shadow-red-500/30"
                title="Report post"
              >
                <Flag className="w-4.5 h-4.5 text-white" />
              </button>
              {onReportProfile && userName && post.username !== userName && (
                <button
                  onClick={() => onReportProfile(post.username, post.avatar, post.banner)}
                  className="w-10 h-10 bg-orange-500/40 hover:bg-orange-500/70 rounded-full flex items-center justify-center transition-all duration-300 group/btn border-2 border-orange-500/70 hover:border-orange-500 hover:scale-110 shadow-lg shadow-orange-500/30"
                  title="Report profile"
                >
                  <Shield className="w-4.5 h-4.5 text-white" />
                </button>
              )}
              
              <button
                onClick={handleMessageClick}
                className="w-10 h-10 bg-[#00d4ff]/40 hover:bg-[#00d4ff]/70 rounded-full flex items-center justify-center transition-all duration-300 group/btn border-2 border-[#00d4ff]/70 hover:border-[#00d4ff] hover:scale-110 shadow-lg shadow-[#00d4ff]/30"
                title="Send message"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom glow accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>{/* end Main Card */}
      </div>{/* end border wrapper */}
    </div>
  );
}