"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Envoi du formulaire vers l'API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      setSubmitStatus({
        type: "success",
        message:
          "Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        sujet: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-campaign-dark via-campaign-purple/20 to-campaign-dark">
      <Header />

      {/* Hero Section avec Image */}
      <section className="relative pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-campaign-red/20 via-campaign-purple/20 to-campaign-pink/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Texte */}
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold hero-text">
                Et vous ?
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Rejoignez le mouvement
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Vous avez une question, une suggestion ou souhaitez vous engager
                à nos côtés ? N'hésitez pas à nous contacter. Ensemble, construisons
                l'avenir de Chelles.
              </p>
            </div>

            {/* Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/et_vous.png"
                alt="Et vous ?"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-campaign-dark/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de Contact */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-campaign-dark mb-8 text-center">
                Contactez-nous
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom et Prénom */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="nom"
                      className="block text-sm font-semibold text-campaign-dark mb-2"
                    >
                      Nom <span className="text-campaign-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campaign-red focus:border-transparent transition-all duration-300"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="prenom"
                      className="block text-sm font-semibold text-campaign-dark mb-2"
                    >
                      Prénom <span className="text-campaign-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campaign-red focus:border-transparent transition-all duration-300"
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>

                {/* Email et Téléphone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-campaign-dark mb-2"
                    >
                      Email <span className="text-campaign-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campaign-red focus:border-transparent transition-all duration-300"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-semibold text-campaign-dark mb-2"
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campaign-red focus:border-transparent transition-all duration-300"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label
                    htmlFor="sujet"
                    className="block text-sm font-semibold text-campaign-dark mb-2"
                  >
                    Sujet <span className="text-campaign-red">*</span>
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campaign-red focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="information">Demande d'information</option>
                    <option value="engagement">Je souhaite m'engager</option>
                    <option value="evenement">Participer à un événement</option>
                    <option value="suggestion">Suggestion / Idée</option>
                    <option value="presse">Demande presse</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-campaign-dark mb-2"
                  >
                    Message <span className="text-campaign-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-campaign-red focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Écrivez votre message ici..."
                  />
                </div>

                {/* Message de statut */}
                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    <p className="font-medium">{submitStatus.message}</p>
                  </div>
                )}

                {/* Bouton d'envoi */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      "Envoyer le message"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="glass p-6 rounded-2xl text-center text-white">
                <div className="w-12 h-12 bg-campaign-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-white/80">contact@chellois-es2026.fr</p>
              </div>

              <div className="glass p-6 rounded-2xl text-center text-white">
                <div className="w-12 h-12 bg-campaign-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Adresse</h3>
                <p className="text-sm text-white/80">Chelles, Seine-et-Marne</p>
              </div>

              <div className="glass p-6 rounded-2xl text-center text-white">
                <div className="w-12 h-12 bg-campaign-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Réseaux sociaux</h3>
                <p className="text-sm text-white/80">@Chelloises2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
