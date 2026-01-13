import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground text-balance">About Web App</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Learn about our mission, values, and the team behind this modern web application.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're committed to building beautiful, functional web applications that help businesses grow and succeed
              in the digital world. Our focus is on creating seamless user experiences with modern technology.
            </p>
          </div>

          {/* Values Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Quality",
                  description: "We deliver high-quality products that exceed expectations",
                },
                {
                  title: "Innovation",
                  description: "We embrace new technologies and creative solutions",
                },
                {
                  title: "Reliability",
                  description: "We build dependable systems you can trust",
                },
                {
                  title: "User-Centric",
                  description: "We prioritize user experience in everything we do",
                },
              ].map((value, i) => (
                <Card key={i} className="border-muted">
                  <CardHeader>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Why Choose Us</h2>
            <div className="prose prose-invert max-w-none">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Expert team with years of web development experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Cutting-edge technology and best practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Responsive and accessible design for all users</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>Dedicated support and continuous improvement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
