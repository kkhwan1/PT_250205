require('@testing-library/jest-dom')

// Web API 모킹
const nodeFetch = require('node-fetch')
global.Request = nodeFetch.Request
global.Response = nodeFetch.Response
global.Headers = nodeFetch.Headers
global.fetch = nodeFetch

// Next.js 모킹
const { NextResponse, NextRequest } = require('next/server')
global.NextResponse = NextResponse
global.NextRequest = NextRequest

// 전역 설정
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) 