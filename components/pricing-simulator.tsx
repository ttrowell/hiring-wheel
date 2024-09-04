"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export function PricingSimulator() {
  const [users, setUsers] = useState(1)
  const [devices, setDevices] = useState(1)
  const [locations, setLocations] = useState(1)
  const [isYearly, setIsYearly] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [captcha, setCaptcha] = useState(false)
  const { toast } = useToast()

  const calculatePrice = () => {
    const basePrice = 100
    const userPrice = users * 10
    const devicePrice = devices * 5
    const locationPrice = locations * 20
    let total = basePrice + userPrice + devicePrice + locationPrice
    if (isYearly) {
      total *= 10 // 2 months free for yearly
    }
    return total.toFixed(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!captcha) {
      toast({
        title: "Error",
        description: "Please complete the captcha" as string,
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Request Submitted",
      description: "Our sales team will contact you soon!",
    })
    // Here you would typically send the form data to your backend
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg">
      <div className="flex justify-center mb-8">
        {/*<Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yshQTniBu34cncJD3TeUAr0n7aV56q.png"
          alt="Onformant Logo"
          width={300}
          height={60}
          priority
        />*/}
      </div>
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-900">SaaS Pricing Simulator</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="users" className="text-lg font-semibold text-indigo-900">
                Number of Users
              </Label>
              <Input
                id="users"
                type="number"
                min="1"
                value={users}
                onChange={(e) => setUsers(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="devices" className="text-lg font-semibold text-indigo-900">
                Number of IoT Devices
              </Label>
              <Input
                id="devices"
                type="number"
                min="1"
                value={devices}
                onChange={(e) => setDevices(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="locations" className="text-lg font-semibold text-indigo-900">
                Number of Locations
              </Label>
              <Input
                id="locations"
                type="number"
                min="1"
                value={locations}
                onChange={(e) => setLocations(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="billing-cycle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <Label htmlFor="billing-cycle" className="text-lg font-semibold text-indigo-900">
                {isYearly ? "Yearly Billing" : "Monthly Billing"}
              </Label>
            </div>
            {isYearly && (
              <p className="text-sm text-indigo-600 italic">Yearly pricing includes 2 months free!</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">Estimated Price</h3>
            <p className="text-5xl font-bold text-indigo-600 mb-2">${calculatePrice()}</p>
            <p className="text-gray-600">{isYearly ? "per year" : "per month"}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-indigo-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-lg font-semibold text-indigo-900">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-lg font-semibold text-indigo-900">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-lg font-semibold text-indigo-900">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="captcha"
                checked={captcha}
                onCheckedChange={(checked) => setCaptcha(checked as boolean)}
                required
              />
              <Label htmlFor="captcha" className="text-sm text-gray-600">
                I am not a robot (Simulated CAPTCHA)
              </Label>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
          Request a Call from Our Sales Team
        </Button>
      </form>
    </div>
  )
}