// import { NextRequest } from 'next/server';
// import { GET, POST } from '@/app/api/recommendations/route';
// import { Redis } from '@upstash/redis';
// import { auth } from '@clerk/nextjs/server';
// import OpenAI from 'openai';
// import { normalizeURL } from '@/utils/url';

// jest.mock('@upstash/redis');
// jest.mock('@clerk/nextjs/server');
// jest.mock('openai');
// jest.mock('@/utils/url');

// describe('Recommendations API', () => {
//   let mockRedis: jest.Mocked<Redis>;
//   let mockOpenAI: jest.Mocked<OpenAI>;
//   let originalEnv: NodeJS.ProcessEnv;

//   beforeEach(() => {
//     originalEnv = process.env;
//     process.env = { ...originalEnv };
//     mockRedis = new Redis({} as any) as jest.Mocked<Redis>;
//     (Redis as jest.Mock).mockReturnValue(mockRedis);
//     (auth as jest.Mock).mockResolvedValue({ userId: 'test-user' });
//     mockOpenAI = new OpenAI({ apiKey: 'test' }) as jest.Mocked<OpenAI>;
//     (OpenAI as jest.Mock).mockReturnValue(mockOpenAI);
//     (normalizeURL as jest.Mock).mockImplementation((url) => url);
//   });

//   afterEach(() => {
//     process.env = originalEnv;
//   });

//   describe('GET /api/recommendations', () => {
//     it('should return 401 if user is not authenticated', async () => {
//       (auth as jest.Mock).mockResolvedValue({ userId: null });
//       const req = new NextRequest('http://localhost/api/recommendations?url=https://example.com');
//       const res = await GET(req);
//       expect(res.status).toBe(401);
//       expect(await res.json()).toEqual({ error: 'Unauthorized' });
//     });

//     it('should return 400 if URL is not provided', async () => {
//       const req = new NextRequest('http://localhost/api/recommendations');
//       const res = await GET(req);
//       expect(res.status).toBe(400);
//       expect(await res.json()).toEqual({ error: 'URL parameter is required' });
//     });

//     it('should return mock data when NEXT_PUBLIC_TESTING_ENVIRONMENT is true', async () => {
//       process.env.NEXT_PUBLIC_TESTING_ENVIRONMENT = 'true';
//       const req = new NextRequest('http://localhost/api/recommendations?url=https://example.com');
//       const res = await GET(req);
//       expect(res.status).toBe(200);
//       const data = await res.json();
//       expect(data).toHaveProperty('recommendations');
//       expect(data).toHaveProperty('improvedRobotsTxt');
//     });

//     it('should return cached recommendations if available', async () => {
//       const cachedRecommendations = { recommendations: ['Rec 1'], improvedRobotsTxt: 'User-agent: *' };
//       mockRedis.get.mockResolvedValue(JSON.stringify(cachedRecommendations));

//       const req = new NextRequest('http://localhost/api/recommendations?url=https://example.com');
//       const res = await GET(req);
//       expect(res.status).toBe(200);
//       expect(await res.json()).toEqual(cachedRecommendations);
//     });

//     it('should return null recommendations if not cached', async () => {
//       mockRedis.get.mockResolvedValue(null);

//       const req = new NextRequest('http://localhost/api/recommendations?url=https://example.com');
//       const res = await GET(req);
//       expect(res.status).toBe(200);
//       expect(await res.json()).toEqual({ recommendations: null, improvedRobotsTxt: null });
//     });
//   });

//   describe('POST /api/recommendations', () => {
//     it('should return 401 if user is not authenticated', async () => {
//       (auth as jest.Mock).mockResolvedValue({ userId: null });
//       const req = new NextRequest('http://localhost/api/recommendations', {
//         method: 'POST',
//         body: JSON.stringify({ robotsTxt: '', analysisResults: {}, url: 'https://example.com' }),
//       });
//       const res = await POST(req);
//       expect(res.status).toBe(401);
//       expect(await res.json()).toEqual({ error: 'Unauthorized' });
//     });

//     it('should return 400 if required parameters are missing', async () => {
//       const req = new NextRequest('http://localhost/api/recommendations', {
//         method: 'POST',
//         body: JSON.stringify({}),
//       });
//       const res = await POST(req);
//       expect(res.status).toBe(400);
//       expect(await res.json()).toEqual({ error: 'Missing required parameters' });
//     });

//     it('should return mock data when NEXT_PUBLIC_TESTING_ENVIRONMENT is true', async () => {
//       process.env.NEXT_PUBLIC_TESTING_ENVIRONMENT = 'true';
//       const req = new NextRequest('http://localhost/api/recommendations', {
//         method: 'POST',
//         body: JSON.stringify({
//           robotsTxt: 'User-agent: *\nDisallow: /',
//           analysisResults: { directives: { allow: [], disallow: ['/'] } },
//           url: 'https://example.com',
//         }),
//       });
//       const res = await POST(req);
//       expect(res.status).toBe(200);
//       const data = await res.json();
//       expect(data).toHaveProperty('recommendations');
//       expect(data).toHaveProperty('improvedRobotsTxt');
//     });

//     it('should generate and cache recommendations', async () => {
//       const mockCompletion = {
//         choices: [{ message: { content: JSON.stringify({ recommendations: ['Rec 1'], improvedRobotsTxt: 'User-agent: *' }) } }],
//       };

//       mockOpenAI.chat.completions.create.mockResolvedValue(mockCompletion as any);
//       mockRedis.get.mockResolvedValue(null);
//       mockRedis.set.mockResolvedValue('OK');

//       const req = new NextRequest('http://localhost/api/recommendations', {
//         method: 'POST',
//         body: JSON.stringify({
//           robotsTxt: 'User-agent: *\nDisallow: /',
//           analysisResults: { directives: { allow: [], disallow: ['/'] } },
//           url: 'https://example.com',
//         }),
//       });
//       const res = await POST(req);
//       expect(res.status).toBe(200);
//       const result = await res.json();
//       expect(result).toHaveProperty('recommendations');
//       expect(result).toHaveProperty('improvedRobotsTxt');
//       expect(mockRedis.set).toHaveBeenCalled();
//     });

//     it('should handle OpenAI errors', async () => {
//       mockOpenAI.chat.completions.create.mockRejectedValue(new Error('OpenAI error'));
//       mockRedis.get.mockResolvedValue(null);

//       const req = new NextRequest('http://localhost/api/recommendations', {
//         method: 'POST',
//         body: JSON.stringify({
//           robotsTxt: 'User-agent: *\nDisallow: /',
//           analysisResults: { directives: { allow: [], disallow: ['/'] } },
//           url: 'https://example.com',
//         }),
//       });
//       const res = await POST(req);
//       expect(res.status).toBe(500);
//       expect(await res.json()).toEqual({ error: 'Internal server error' });
//     });
//   });
// });
