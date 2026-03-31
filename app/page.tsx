import { supabase } from '@/lib/supabase'
import WaitlistPage from '@/components/WaitlistPage'

const TOTAL_SPOTS = 200

async function getSignupCount(): Promise<number> {
  try {
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
    return count ?? 146
  } catch {
    return 146
  }
}

export const revalidate = 60

export default async function Home() {
  const signupCount = await getSignupCount()

  return <WaitlistPage signupCount={signupCount} totalSpots={TOTAL_SPOTS} />
}
