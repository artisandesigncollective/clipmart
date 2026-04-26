import React, { useState } from 'react';

/**
 * Clipmart: The AI Agent Marketplace
 * 
 * Pain Point: Developers are building incredible autonomous AI agents, but have no 
 * centralized platform to sell them to non-technical B2B buyers.
 * 
 * Solution: MicroAcquire for AI. A marketplace where buyers can purchase the source 
 * code and IP of functional AI agents.
 */

export const MarketplaceGrid = () => {
  const [agentsForSale] = useState([
    {
      id: 'bot_1092',
      name: 'Legal RAG Engine (California Law)',
      description: 'Fully autonomous RAG pipeline trained on CA Housing Code. Built in Next.js.',
      mrr: '$1,200',
      price: '$15,000',
      developer: 'artisandesigncollective'
    },
    {
      id: 'bot_8842',
      name: 'Reddit AI Lead Gen Bot',
      description: 'Python PRAW scraper that finds leads and drafts LLM replies.',
      mrr: '$500',
      price: '$4,500',
      developer: 'growth_hacker99'
    },
    {
      id: 'bot_3391',
      name: 'SOC2 Pen-Test Agent',
      description: 'Enterprise B2B autonomous vulnerability scanner.',
      mrr: '$8,000',
      price: '$85,000',
      developer: 'secops_ai'
    }
  ]);

  const handleAcquisition = (agentId: string, price: string) => {
    console.log(`[Clipmart] 🛒 Initiating Escrow Acquisition for ${agentId} at ${price}`);
    alert(`Redirecting to Stripe Escrow to hold ${price} in trust...`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Clipmart.</h1>
            <p className="text-slate-500 mt-2 font-medium">Buy and sell autonomous AI companies.</p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition">
            Sell an AI Agent
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentsForSale.map((agent) => (
            <div key={agent.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{agent.name}</h3>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded">Verified</span>
                </div>
                <p className="text-slate-600 text-sm mb-6">{agent.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold">Current MRR</p>
                    <p className="text-lg font-bold text-emerald-600">{agent.mrr}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold">Asking Price</p>
                    <p className="text-lg font-bold text-slate-900">{agent.price}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleAcquisition(agent.id, agent.price)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-600/20"
              >
                Acquire Source Code
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MarketplaceGrid;
