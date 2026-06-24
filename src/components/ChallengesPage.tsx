// @ts-nocheck
'use client'
import { useState, useEffect, useRef } from "react";
import { Trophy, Star, Zap, Target, Gift, Crown, Lock, CheckCircle, Clock, Flame, ShoppingBag, ChevronRight } from "lucide-react";
const challengesBg = '/assets/video_game-league_of_legends-teemo_league_of_legends-624777.jpeg';

interface ChallengesPageProps {
  isLoggedIn: boolean;
  userName: string;
  userAvatar?: string;
  riotVerified?: boolean;
  hasPremium?: boolean;
  onUpgradePremium?: () => void;
  canManageChallenges?: boolean;
}

interface Challenge {
  id: number;
  title: string;
  enrolled?: boolean;
  description: string;
  points: number;
  difficulty: "easy" | "medium" | "hard" | "legendary";
  progress: number;
  total: number;
  expiresIn?: string;
  completed: boolean;
  icon: string;
  category: "ranked" | "performance" | "social" | "special";
}

interface RewardItem {
  id: number;
  title: string;
  description: string;
  cost: number;
  icon: string;
  category: "gift" | "rp" | "premium";
  available: boolean;
}

const CHALLENGES: Challenge[] = [
  { id: 1, title: "First Blood", description: "Win 1 ranked match", points: 100, difficulty: "easy", progress: 0, total: 1, expiresIn: "3 days", completed: false, icon: "⚔️", category: "ranked" },
  { id: 2, title: "Pentakill Machine", description: "Get a Pentakill in any game mode", points: 2000, difficulty: "legendary", progress: 0, total: 1, expiresIn: "7 days", completed: false, icon: "💥", category: "performance" },
  { id: 3, title: "S-Rank Master", description: "Earn an S rank on any champion", points: 500, difficulty: "medium", progress: 0, total: 1, expiresIn: "5 days", completed: false, icon: "⭐", category: "performance" },
  { id: 4, title: "Win Streak", description: "Win 3 ranked matches in a row", points: 350, difficulty: "medium", progress: 1, total: 3, expiresIn: "2 days", completed: false, icon: "🔥", category: "ranked" },
  { id: 5, title: "KDA God", description: "Finish a game with KDA above 10.0", points: 750, difficulty: "hard", progress: 0, total: 1, expiresIn: "7 days", completed: false, icon: "🏆", category: "performance" },
  { id: 6, title: "Support Hero", description: "Play 5 games as Support role", points: 200, difficulty: "easy", progress: 3, total: 5, expiresIn: "4 days", completed: false, icon: "🛡️", category: "ranked" },
  { id: 7, title: "Team Player", description: "Get 10 assists in a single game", points: 300, difficulty: "medium", progress: 0, total: 1, expiresIn: "6 days", completed: false, icon: "🤝", category: "social" },
  { id: 8, title: "Weekly Warrior", description: "Play 20 games this week", points: 1000, difficulty: "hard", progress: 7, total: 20, expiresIn: "5 days", completed: false, icon: "🗡️", category: "special" },
  { id: 9, title: "Baron Slayer", description: "Participate in killing Baron Nashor 3 times", points: 450, difficulty: "medium", progress: 0, total: 3, expiresIn: "7 days", completed: false, icon: "🐉", category: "performance" },
  { id: 10, title: "Perfect CS", description: "Achieve 8+ CS per minute in a ranked game", points: 600, difficulty: "hard", progress: 0, total: 1, expiresIn: "7 days", completed: false, icon: "💰", category: "performance" },
];

const REWARDS: RewardItem[] = [
  { id: 1, title: "€5 Gift Card", description: "Redeemable on Amazon, Steam, or Google Play", cost: 5000, icon: "🎁", category: "gift", available: true },
  { id: 2, title: "€10 Gift Card", description: "Redeemable on Amazon, Steam, or Google Play", cost: 9500, icon: "🎁", category: "gift", available: true },
  { id: 3, title: "650 Riot Points", description: "Official Riot Points for your account", cost: 3000, icon: "💎", category: "rp", available: true },
  { id: 4, title: "1380 Riot Points", description: "Official Riot Points for your account", cost: 5500, icon: "💎", category: "rp", available: true },
  { id: 5, title: "FinderQ Premium (1 month)", description: "Full access to Premium features", cost: 2500, icon: "👑", category: "premium", available: true },
  { id: 6, title: "FinderQ Premium (3 months)", description: "Full access to Premium features", cost: 6000, icon: "👑", category: "premium", available: true },
];

const difficultyConfig = {
  easy: { label: "Easy", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  medium: { label: "Medium", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  hard: { label: "Hard", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  legendary: { label: "Legendary", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
};

const categoryConfig = {
  ranked: { label: "Ranked", color: "text-blue-400" },
  performance: { label: "Performance", color: "text-yellow-400" },
  social: { label: "Social", color: "text-green-400" },
  special: { label: "Special", color: "text-purple-400" },
};

export function ChallengesPage({ isLoggedIn, userName, userAvatar, riotVerified, hasPremium, onUpgradePremium, canManageChallenges }: ChallengesPageProps) {
  const [activeTab, setActiveTab] = useState<"challenges" | "store" | "leaderboard">("challenges");
  const [filterCategory, setFilterCategory] = useState<"all" | "ranked" | "performance" | "social" | "special">("all");
  const [userPoints] = useState(1250);
  const [userLevel] = useState(12);
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);
  const [addChallengeModal, setAddChallengeModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({ title: '', description: '', difficulty: 'easy' as 'easy'|'medium'|'hard'|'legendary', total: 10, reward: 100, xp: 50, type: 'wins' as string });
  const [rewards, setRewards] = useState(REWARDS);
  const [addRewardModal, setAddRewardModal] = useState(false);
  const [editRewardId, setEditRewardId] = useState<number | null>(null);
  const [newReward, setNewReward] = useState({ title: '', description: '', cost: 500, icon: '🎁' });
  const [adModal, setAdModal] = useState<{challengeId: number} | null>(null);
  const [adCountdown, setAdCountdown] = useState(60);
  const [adFinished, setAdFinished] = useState(false);
  const adTimerRef = useRef<any>(null);
  const activeChallenge = challenges.find(c => c.enrolled && !c.completed);

  const filteredChallenges = filterCategory === "all"
    ? challenges
    : challenges.filter(c => c.category === filterCategory);

  const completedCount = challenges.filter(c => c.completed).length;
  const totalPoints = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);

  const handleClaimChallenge = (id: number) => {
    setChallenges((prev: any) => prev.map(c => c.id === id ? { ...c, completed: true, progress: c.total } : c));
  };

  const handleEnroll = (id: number) => {
    setAdModal({ challengeId: id });
    setAdCountdown(60);
    setAdFinished(false);
    adTimerRef.current = setInterval(() => {
      setAdCountdown(prev => {
        if (prev <= 1) {
          clearInterval(adTimerRef.current);
          setAdFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStartAfterAd = () => {
    if (!adModal) return;
    setChallenges((prev: any) => prev.map(c => c.id === adModal.challengeId ? { ...c, enrolled: true } : c));
    setAdModal(null);
    setAdFinished(false);
    clearInterval(adTimerRef.current);
  };

  const handleCloseAd = () => {
    clearInterval(adTimerRef.current);
    setAdModal(null);
    setAdFinished(false);
  };

  useEffect(() => () => clearInterval(adTimerRef.current), []);

  const handlePurchase = (item: RewardItem) => {
    if (userPoints >= item.cost) {
      setPurchaseSuccess(item.title);
      setTimeout(() => setPurchaseSuccess(null), 3000);
    }
  };

  const xpPercent = ((userLevel % 1) * 100) || 65;

  const leaderboard = [
    { rank: 1, username: "ShadowADC", points: 12450, level: 28, badge: "🥇" },
    { rank: 2, username: "IronWolf99", points: 10200, level: 24, badge: "🥈" },
    { rank: 3, username: "NightOwlTop", points: 8750, level: 21, badge: "🥉" },
    { rank: 4, username: "MidLaneMaster", points: 7100, level: 19, badge: "4" },
    { rank: 5, username: "JungleKing88", points: 6500, level: 17, badge: "5" },
    { rank: 6, username: userName || "You", points: userPoints, level: userLevel, badge: "—" },
  ];

  return (
    <>
    {/* Ad Modal */}
    {adModal && (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div className="bg-[#1a1d29] rounded-2xl max-w-md w-full border border-white/10 shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#c89b3c] to-[#00d4ff]" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Urmărește un ad</h3>
              {!adFinished && (
                <span className="px-2 py-1 bg-white/5 text-white/50 text-xs rounded-lg border border-white/10">
                  Skip în {adCountdown}s
                </span>
              )}
            </div>

            {/* Ad placeholder */}
            <div className="bg-[#0a0e27] rounded-xl flex flex-col items-center justify-center border border-white/8 mb-5" style={{height: '200px'}}>
              {adFinished ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-green-400 font-semibold">Ad completat!</p>
                  <p className="text-white/40 text-xs mt-1">Acum poți începe challenge-ul</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl mb-3">📺</div>
                  <p className="text-white/60 text-sm">Ad în derulare...</p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-1.5">
                      <div
                        className="bg-[#00d4ff] h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${((60 - adCountdown) / 60) * 100}%` }}
                      />
                    </div>
                    <span className="text-white/40 text-xs">{adCountdown}s</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCloseAd}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/8 text-white/60 rounded-lg text-sm border border-white/10 transition-colors"
              >
                Anulează
              </button>
              <button
                onClick={handleStartAfterAd}
                disabled={!adFinished}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  adFinished
                    ? 'bg-gradient-to-r from-[#00d4ff] to-[#00b8e6] text-white hover:opacity-90'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                {adFinished ? 'Începe Challenge-ul' : `Așteaptă ${adCountdown}s`}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    <div className="min-h-screen pt-20 pb-24 px-4 relative" style={{ backgroundImage: `url(${challengesBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-[#0a0e27]/75 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl">⚡</div>
            <div>
              <h1 className="text-white text-3xl font-bold">Challenges</h1>
              <p className="text-white/50 text-sm">Complete missions, earn points, claim rewards</p>
            </div>
          </div>
          {canManageChallenges && (
            <button
              onClick={() => setAddChallengeModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c89b3c] to-[#00d4ff] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              <span className="text-lg leading-none">+</span>
              Add Challenge
            </button>
          )}
        </div>

        {/* Add Challenge Modal */}
        {addChallengeModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setAddChallengeModal(false)}>
            <div className="bg-[#1a1d29] rounded-2xl max-w-md w-full border border-white/10 shadow-2xl p-6" onClick={e => e.stopPropagation()}>
              <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">⚡ Add New Challenge</h3>
              <div className="space-y-3">
                <input value={newChallenge.title} onChange={e => setNewChallenge(p => ({...p, title: e.target.value}))} placeholder="Title" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00d4ff]/50" />
                <textarea value={newChallenge.description} onChange={e => setNewChallenge(p => ({...p, description: e.target.value}))} placeholder="Description" rows={2} className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00d4ff]/50 resize-none" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Difficulty</label>
                    <select value={newChallenge.difficulty} onChange={e => setNewChallenge(p => ({...p, difficulty: e.target.value as any}))} className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none">
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Target</label>
                    <input type="number" value={newChallenge.total} onChange={e => setNewChallenge(p => ({...p, total: +e.target.value}))} className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">Points Reward</label>
                    <input type="number" value={newChallenge.reward} onChange={e => setNewChallenge(p => ({...p, reward: +e.target.value}))} className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-1 block">XP</label>
                    <input type="number" value={newChallenge.xp} onChange={e => setNewChallenge(p => ({...p, xp: +e.target.value}))} className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 mt-5">
                <button onClick={() => setAddChallengeModal(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/8 text-white/70 rounded-lg text-sm border border-white/10 transition-colors">Cancel</button>
                <button
                  onClick={() => {
                    if (!newChallenge.title.trim()) return;
                    setChallenges((prev: any) => [...prev, {
                      id: Date.now(), title: newChallenge.title, description: newChallenge.description,
                      difficulty: newChallenge.difficulty, progress: 0, total: newChallenge.total,
                      reward: newChallenge.reward, xp: newChallenge.xp, type: newChallenge.type,
                      completed: false, enrolled: false, isPremium: false,
                    } as any]);
                    setAddChallengeModal(false);
                    setNewChallenge({ title: '', description: '', difficulty: 'easy', total: 10, reward: 100, xp: 50, type: 'wins' });
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#c89b3c] to-[#00d4ff] text-white rounded-lg text-sm font-semibold transition-all"
                >
                  Add Challenge
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-[#1a1d29] rounded-xl p-4 border border-white/8">
            <p className="text-white/40 text-xs mb-1">Points Balance</p>
            <p className="text-[#00d4ff] text-2xl font-bold">{userPoints.toLocaleString()}</p>
          </div>
          <div className="bg-[#1a1d29] rounded-xl p-4 border border-white/8">
            <p className="text-white/40 text-xs mb-1">Level</p>
            <p className="text-yellow-400 text-2xl font-bold">{userLevel}</p>
            <div className="w-full bg-white/10 rounded-full h-1 mt-1">
              <div className="bg-yellow-400 h-1 rounded-full transition-all" style={{ width: `${xpPercent}%` }} />
            </div>
          </div>
          <div className="bg-[#1a1d29] rounded-xl p-4 border border-white/8">
            <p className="text-white/40 text-xs mb-1">Completed</p>
            <p className="text-green-400 text-2xl font-bold">{completedCount}/{challenges.length}</p>
          </div>
          <div className="bg-[#1a1d29] rounded-xl p-4 border border-white/8">
            <p className="text-white/40 text-xs mb-1">Points Earned</p>
            <p className="text-purple-400 text-2xl font-bold">{totalPoints.toLocaleString()}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-[#1a1d29] p-1 rounded-xl border border-white/8 w-fit">
          {[
            { id: "challenges", label: "Challenges", icon: "⚡" },
            { id: "store", label: "Rewards Store", icon: "🛒" },
            { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Challenges Tab */}
        {activeTab === "challenges" && (
          <>
            {/* Category filter */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {(["all", "ranked", "performance", "social", "special"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    filterCategory === cat
                      ? "bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30"
                      : "bg-white/5 text-white/50 border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat === "all" ? "All" : categoryConfig[cat].label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredChallenges.map(challenge => {
                const diff = difficultyConfig[challenge.difficulty];
                const progressPct = Math.min(100, (challenge.progress / challenge.total) * 100);
                return (
                  <div
                    key={challenge.id}
                    className={`relative bg-[#1a1d29] rounded-xl p-4 border transition-all ${
                      challenge.completed
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-white/8 hover:border-white/20"
                    }`}
                  >
                    {challenge.completed && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    )}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">{challenge.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <h3 className="text-white font-semibold text-sm">{challenge.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${diff.bg} ${diff.color}`}>
                            {diff.label}
                          </span>
                        </div>
                        <p className="text-white/50 text-xs">{challenge.description}</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/40">Progress</span>
                        <span className="text-white/60">{challenge.progress}/{challenge.total}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${challenge.completed ? 'bg-green-400' : 'bg-[#00d4ff]'}`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-[#00d4ff]" />
                          <span className="text-[#00d4ff] font-bold text-sm">{challenge.points.toLocaleString()} pts</span>
                        </div>
                        {challenge.expiresIn && (
                          <div className="flex items-center gap-1 text-white/30 text-xs">
                            <Clock className="w-3 h-3" />
                            {challenge.expiresIn}
                          </div>
                        )}
                      </div>
                      {challenge.completed ? (
                        <span className="text-green-400 text-xs font-medium">Claimed ✓</span>
                      ) : challenge.progress >= challenge.total ? (
                        <button
                          onClick={() => handleClaimChallenge(challenge.id)}
                          className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-xs font-semibold border border-green-500/30 transition-all"
                        >
                          Claim Reward
                        </button>
                      ) : challenge.enrolled ? (
                        <span className="px-2 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-lg border border-[#00d4ff]/20 font-medium">
                          In Progress
                        </span>
                      ) : activeChallenge ? (
                        <span className="px-2 py-1 bg-white/5 text-white/30 text-xs rounded-lg border border-white/10">
                          Locked
                        </span>
                      ) : (
                        <button
                          onClick={() => handleEnroll(challenge.id)}
                          className="px-3 py-1.5 bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] rounded-lg text-xs font-semibold border border-[#00d4ff]/20 transition-all"
                        >
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Rewards Store Tab */}
        {activeTab === "store" && (
          <div>
            {purchaseSuccess && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400 text-sm font-medium">Successfully purchased: {purchaseSuccess}!</p>
              </div>
            )}

            <div className="flex items-center justify-between mb-5">
              <p className="text-white/50 text-sm">Your balance: <span className="text-[#00d4ff] font-bold">{userPoints.toLocaleString()} pts</span></p>
              {canManageChallenges && (
                <button onClick={() => { setAddRewardModal(true); setEditRewardId(null); setNewReward({ title: '', description: '', cost: 500, icon: '🎁' }); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#c89b3c] to-[#00d4ff] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-all">
                  <span>+</span> Add Reward
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map(item => {
                const canAfford = userPoints >= item.cost;
                return (
                  <div key={item.id} className={`bg-[#1a1d29] rounded-xl p-5 border transition-all relative group ${canAfford ? 'border-white/10 hover:border-[#00d4ff]/30' : 'border-white/5 opacity-60'}`}>
                    {canManageChallenges && (
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditRewardId(item.id); setNewReward({ title: item.title, description: item.description, cost: item.cost, icon: item.icon }); setAddRewardModal(true); }} className="w-6 h-6 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs flex items-center justify-center">✏️</button>
                        <button onClick={() => setRewards((prev: any) => prev.filter(r => r.id !== item.id))} className="w-6 h-6 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs flex items-center justify-center">✕</button>
                      </div>
                    )}
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/40 text-xs mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-[#00d4ff]" />
                        <span className={`font-bold text-sm ${canAfford ? 'text-[#00d4ff]' : 'text-white/40'}`}>{item.cost.toLocaleString()} pts</span>
                      </div>
                      <button onClick={() => handlePurchase(item)} disabled={!canAfford} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${canAfford ? 'bg-gradient-to-r from-[#00d4ff] to-[#00b8e6] text-white hover:opacity-90' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}>
                        {canAfford ? 'Redeem' : 'Not enough pts'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add/Edit Reward Modal */}
            {addRewardModal && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setAddRewardModal(false)}>
                <div className="bg-[#1a1d29] rounded-2xl max-w-sm w-full border border-white/10 shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                  <h3 className="text-white font-bold text-lg mb-5">{editRewardId ? '✏️ Edit Reward' : '🛒 Add Reward'}</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input value={newReward.icon} onChange={e => setNewReward(p => ({...p, icon: e.target.value}))} placeholder="Icon" className="w-16 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none text-center" />
                      <input value={newReward.title} onChange={e => setNewReward(p => ({...p, title: e.target.value}))} placeholder="Title" className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none" />
                    </div>
                    <input value={newReward.description} onChange={e => setNewReward(p => ({...p, description: e.target.value}))} placeholder="Description" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none" />
                    <div>
                      <label className="text-white/50 text-xs mb-1 block">Cost (pts)</label>
                      <input type="number" value={newReward.cost} onChange={e => setNewReward(p => ({...p, cost: +e.target.value}))} className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-2.5 mt-5">
                    <button onClick={() => setAddRewardModal(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/8 text-white/70 rounded-lg text-sm border border-white/10 transition-colors">Cancel</button>
                    <button
                      onClick={() => {
                        if (!newReward.title.trim()) return;
                        if (editRewardId) {
                          setRewards((prev: any) => prev.map(r => r.id === editRewardId ? { ...r, ...newReward } : r));
                        } else {
                          setRewards((prev: any) => [...prev, { id: Date.now(), ...newReward, type: 'cosmetic' } as any]);
                        }
                        setAddRewardModal(false);
                      }}
                      className="flex-1 py-2.5 bg-gradient-to-r from-[#c89b3c] to-[#00d4ff] text-white rounded-lg text-sm font-semibold"
                    >
                      {editRewardId ? 'Save' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="bg-[#1a1d29] rounded-xl border border-white/8 overflow-hidden">
            <div className="p-4 border-b border-white/8">
              <h3 className="text-white font-semibold">Top Players this Season</h3>
            </div>
            <div className="divide-y divide-white/5">
              {leaderboard.map((entry, i) => {
                const isMe = entry.username === (userName || "You");
                return (
                  <div key={i} className={`flex items-center gap-4 px-4 py-3 ${isMe ? 'bg-[#00d4ff]/5 border-l-2 border-[#00d4ff]' : 'hover:bg-white/3'}`}>
                    <div className="w-8 text-center">
                      {i < 3 ? (
                        <span className="text-xl">{entry.badge}</span>
                      ) : (
                        <span className="text-white/30 font-bold text-sm">#{entry.rank}</span>
                      )}
                    </div>
                    <div className="w-9 h-9 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{entry.username.slice(0,2).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${isMe ? 'text-[#00d4ff]' : 'text-white'}`}>
                        {entry.username} {isMe && <span className="text-xs font-normal">(You)</span>}
                      </p>
                      <p className="text-white/40 text-xs">Level {entry.level}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#00d4ff]" />
                      <span className="text-white font-bold text-sm">{entry.points.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
