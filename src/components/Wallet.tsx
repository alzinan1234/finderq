// @ts-nocheck
'use client'
import React, { useState } from 'react';
import { X, Wallet as WalletIcon, TrendingUp, TrendingDown, Plus, Send, ArrowUpRight, ArrowDownLeft, CreditCard, DollarSign, Euro, Calendar } from 'lucide-react';
const walletHeaderLogo = '/assets/ChatGPT_Image_Jun_10__2026__11_30_49_AM-removebg-preview-1.png';

interface WalletProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  balance?: number;
  onBalanceChange?: (newBalance: number) => void;
}

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'tournament_win' | 'tournament_entry' | 'transfer_in' | 'transfer_out';
  amount: number;
  currency: 'EUR';
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export function Wallet({ isOpen, onClose, username, balance: externalBalance, onBalanceChange }: WalletProps) {
  const [balance, setBalance] = useState(externalBalance ?? 1250.50);

  React.useEffect(() => {
    if (externalBalance !== undefined) setBalance(externalBalance);
  }, [externalBalance]);

  const updateBalance = (val: number) => {
    setBalance(val);
    onBalanceChange?.(val);
    localStorage.setItem('finderq_wallet_balance', val.toString());
  };
  const [pendingBalance, setPendingBalance] = useState(350.00);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'settings'>('overview');

  const transactions: Transaction[] = [
    { id: 1, type: 'tournament_win', amount: 500.00, currency: 'EUR', description: '🏆 Spring Championship 2026 - 1st Place', date: '2026-04-05', status: 'completed' },
    { id: 2, type: 'tournament_entry', amount: -50.00, currency: 'EUR', description: '🎮 Spring Championship 2026 - Entry Fee', date: '2026-04-01', status: 'completed' },
    { id: 3, type: 'deposit', amount: 200.00, currency: 'EUR', description: '💳 Deposit via VISA', date: '2026-03-28', status: 'completed' },
    { id: 4, type: 'tournament_win', amount: 150.00, currency: 'EUR', description: '🥈 Weekly Cup #42 - 2nd Place', date: '2026-03-25', status: 'completed' },
    { id: 5, type: 'tournament_entry', amount: -25.00, currency: 'EUR', description: '🎮 Weekly Cup #42 - Entry Fee', date: '2026-03-24', status: 'completed' },
    { id: 6, type: 'withdrawal', amount: -100.00, currency: 'EUR', description: '🏦 Withdrawal to Bank Account', date: '2026-03-20', status: 'completed' },
    { id: 7, type: 'deposit', amount: 300.00, currency: 'EUR', description: '💳 Deposit via PayPal', date: '2026-03-15', status: 'completed' },
    { id: 8, type: 'tournament_win', amount: 75.00, currency: 'EUR', description: '🥉 Friday Night Cup - 3rd Place', date: '2026-03-12', status: 'completed' },
    { id: 9, type: 'tournament_entry', amount: -15.00, currency: 'EUR', description: '🎮 Friday Night Cup - Entry Fee', date: '2026-03-11', status: 'pending' },
    { id: 10, type: 'deposit', amount: 250.00, currency: 'EUR', description: '💳 Deposit via Revolut', date: '2026-03-08', status: 'completed' },
  ];

  const totalEarnings = transactions
    .filter(t => t.type === 'tournament_win' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter(t => t.type === 'tournament_entry' && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netProfit = totalEarnings - totalSpent;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-gradient-to-br from-[#1a1d29] to-[#151821] rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-green-500/20 shadow-2xl shadow-green-500/10">
        {/* Header */}
        <div className="relative p-6 border-b border-white/5 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center">
                <img src={walletHeaderLogo} alt="Wallet" className="w-32 h-32 object-contain" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1" style={{ marginLeft: '-85px' }}>My Wallet</h2>
                <p className="text-white/60 text-sm">Manage your funds & tournament earnings</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white/70" />
            </button>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {/* Available Balance */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/70 text-sm font-medium">Available Balance</p>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Euro className="w-4 h-4 text-green-400" />
                </div>
              </div>
              <p className="text-4xl font-bold text-white mb-1">€{balance.toFixed(2)}</p>
              <p className="text-green-400 text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12.5% this month
              </p>
            </div>

            {/* Pending Balance */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/70 text-sm font-medium">Pending</p>
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              <p className="text-4xl font-bold text-white mb-1">€{pendingBalance.toFixed(2)}</p>
              <p className="text-yellow-400 text-xs font-medium">Processing...</p>
            </div>

            {/* Net Profit */}
            <div className={`bg-gradient-to-br ${netProfit >= 0 ? 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20' : 'from-red-500/10 to-pink-500/10 border-red-500/20'} border rounded-xl p-5 backdrop-blur-sm`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/70 text-sm font-medium">Net Profit</p>
                <div className={`p-2 ${netProfit >= 0 ? 'bg-cyan-500/20' : 'bg-red-500/20'} rounded-lg`}>
                  {netProfit >= 0 ? 
                    <TrendingUp className="w-4 h-4 text-cyan-400" /> :
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  }
                </div>
              </div>
              <p className={`text-4xl font-bold ${netProfit >= 0 ? 'text-cyan-400' : 'text-red-400'} mb-1`}>
                {netProfit >= 0 ? '+' : ''}€{netProfit.toFixed(2)}
              </p>
              <p className={`${netProfit >= 0 ? 'text-cyan-400' : 'text-red-400'} text-xs font-medium`}>
                From tournaments
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-4 border-b border-white/5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold text-sm transition-all relative ${
              activeTab === 'overview'
                ? 'text-green-400'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-3 font-semibold text-sm transition-all relative ${
              activeTab === 'transactions'
                ? 'text-green-400'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            Transactions
            {activeTab === 'transactions' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 font-semibold text-sm transition-all relative ${
              activeTab === 'settings'
                ? 'text-green-400'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            Payment Methods
            {activeTab === 'settings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div>
                <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowDepositModal(true)}
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 hover:from-green-500/30 hover:to-emerald-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-500/30 rounded-xl group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-lg mb-1">Deposit Funds</p>
                        <p className="text-white/60 text-sm">Add money to your wallet</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/30 rounded-xl group-hover:scale-110 transition-transform">
                        <Send className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-lg mb-1">Withdraw</p>
                        <p className="text-white/60 text-sm">Transfer to your bank</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-white text-lg font-bold mb-4">Tournament Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-white/60 text-sm mb-2">Total Earnings</p>
                    <p className="text-3xl font-bold text-green-400">€{totalEarnings.toFixed(2)}</p>
                    <p className="text-white/50 text-xs mt-2">{transactions.filter(t => t.type === 'tournament_win').length} wins</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-white/60 text-sm mb-2">Total Spent</p>
                    <p className="text-3xl font-bold text-red-400">€{totalSpent.toFixed(2)}</p>
                    <p className="text-white/50 text-xs mt-2">{transactions.filter(t => t.type === 'tournament_entry').length} entries</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-white/60 text-sm mb-2">Win Rate</p>
                    <p className="text-3xl font-bold text-cyan-400">{((transactions.filter(t => t.type === 'tournament_win').length / transactions.filter(t => t.type === 'tournament_entry').length) * 100).toFixed(0)}%</p>
                    <p className="text-white/50 text-xs mt-2">Success ratio</p>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h3 className="text-white text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-2">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            transaction.amount > 0
                              ? 'bg-green-500/20'
                              : 'bg-red-500/20'
                          }`}>
                            {transaction.amount > 0 ? (
                              <ArrowDownLeft className="w-5 h-5 text-green-400" />
                            ) : (
                              <ArrowUpRight className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{transaction.description}</p>
                            <p className="text-white/50 text-xs">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${
                            transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                          </p>
                          <p className={`text-xs font-medium ${
                            transaction.status === 'completed' ? 'text-green-400' :
                            transaction.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {transaction.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-bold">All Transactions</h3>
                <div className="flex items-center gap-2">
                  <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-green-400/50">
                    <option value="all">All Types</option>
                    <option value="deposits">Deposits</option>
                    <option value="withdrawals">Withdrawals</option>
                    <option value="tournaments">Tournaments</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          transaction.amount > 0
                            ? 'bg-green-500/20'
                            : 'bg-red-500/20'
                        }`}>
                          {transaction.amount > 0 ? (
                            <ArrowDownLeft className="w-5 h-5 text-green-400" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{transaction.description}</p>
                          <p className="text-white/50 text-xs">{transaction.date} • {transaction.type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                          transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-bold mb-4">Saved Payment Methods</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                          <CreditCard className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-bold">VISA •••• 4242</p>
                          <p className="text-white/50 text-sm">Expires 12/28</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-500/20 rounded-full">
                        <p className="text-green-400 text-xs font-bold">Default</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#003087]/20 rounded-lg">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#003087">
                            <text x="4" y="16" fontFamily="Arial" fontSize="10" fontWeight="bold">PP</text>
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-bold">PayPal</p>
                          <p className="text-white/50 text-sm">john.doe@email.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-dashed border-green-500/30 rounded-xl p-5 hover:from-green-500/20 hover:to-emerald-500/20 transition-all group">
                    <div className="flex items-center justify-center gap-3">
                      <Plus className="w-5 h-5 text-green-400" />
                      <p className="text-green-400 font-bold">Add New Payment Method</p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-white text-lg font-bold mb-4">Bank Account (Withdrawals)</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-cyan-500/20 rounded-lg">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold">Bank Transfer (SEPA)</p>
                      <p className="text-white/50 text-sm">RO49 AAAA 1B31 0075 9384 0000</p>
                    </div>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                    <p className="text-cyan-400 text-xs">✓ Verified • Withdrawals typically take 1-3 business days</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[10000] p-4">
          <div className="bg-gradient-to-br from-[#1a1d29] to-[#151821] rounded-2xl w-full max-w-md border border-green-500/20 shadow-2xl shadow-green-500/10">
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Deposit Funds</h3>
                <button onClick={() => setShowDepositModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
              <p className="text-white/60 text-sm">Add money to your FinderQ wallet</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Amount (EUR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 font-bold text-xl">€</span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0a0e1a]/50 border border-white/10 rounded-lg pl-10 pr-4 py-4 text-white text-2xl font-bold placeholder:text-white/40 focus:outline-none focus:border-green-400/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDepositAmount(amount.toString())}
                    className="px-4 py-2 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 rounded-lg text-white font-semibold transition-all"
                  >
                    €{amount}
                  </button>
                ))}
              </div>

              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                <p className="text-green-400 text-xs">✓ Instant deposit • No fees • Secure payment</p>
              </div>

              <button
                onClick={() => {
                  alert(`✅ Deposit of €${depositAmount} initiated!\n\nYou would be redirected to payment gateway.`);
                  setShowDepositModal(false);
                  setDepositAmount('');
                }}
                disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[10000] p-4">
          <div className="bg-gradient-to-br from-[#1a1d29] to-[#151821] rounded-2xl w-full max-w-md border border-blue-500/20 shadow-2xl shadow-blue-500/10">
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">Withdraw Funds</h3>
                <button onClick={() => setShowWithdrawModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
              <p className="text-white/60 text-sm">Transfer to your bank account</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-white/60 text-sm mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-white">€{balance.toFixed(2)}</p>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Amount (EUR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold text-xl">€</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    max={balance}
                    className="w-full bg-[#0a0e1a]/50 border border-white/10 rounded-lg pl-10 pr-4 py-4 text-white text-2xl font-bold placeholder:text-white/40 focus:outline-none focus:border-blue-400/50"
                  />
                </div>
              </div>

              <button
                onClick={() => setWithdrawAmount(balance.toString())}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Withdraw All
              </button>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-yellow-400 text-xs">⚠️ Withdrawals take 1-3 business days to process</p>
              </div>

              <button
                onClick={() => {
                  alert(`✅ Withdrawal of €${withdrawAmount} initiated!\n\nFunds will arrive in 1-3 business days.`);
                  setShowWithdrawModal(false);
                  setWithdrawAmount('');
                }}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Withdraw to Bank
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
