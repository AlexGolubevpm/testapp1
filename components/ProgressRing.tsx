'use client'
import React from 'react'

export function ProgressRing({ value }:{ value:number }){
  const r = 54, c = 2*Math.PI*r
  const off = c - (value/100)*c
  return (
    <svg width={140} height={140} viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} stroke="#1f2937" strokeWidth={12} fill="none"/>
      <circle cx="60" cy="60" r={r} stroke="#14b8a6" strokeWidth={12} fill="none" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#e5e7eb">{Math.round(value)}%</text>
    </svg>
  )}
