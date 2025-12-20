"use client"

import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/lib/redux/services/baserowApi"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function SignOutButton() {

  const router = useRouter()
  const [logout] = useLogoutMutation()

  const handleSignOut = async () => {
    await logout();
    toast.success("Sign out successful!", {
      classNames: {
        icon: 'text-red-500',
      }
    })
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
