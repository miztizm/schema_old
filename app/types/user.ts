export interface User {
  id: number
  email: string
  username: string
  title: string
  remember: boolean
  role: 'node' | 'agent' | 'architect'
  pulses: number
  created_at: string
  updated_at: string
  token: string
  roles: Array<string>
  // Add other user properties as needed
  // walletAddress?: string (for future blockchain integration)
}
