// src/app/confidentialite/page.js
'use client';

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔒 Politique de Confidentialité
          </h1>
          <p className="text-gray-600">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-900 font-semibold">
                ℹ️ Souk Africa s'engage à protéger la vie privée de ses utilisateurs et à traiter leurs données personnelles de manière transparente et sécurisée.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Responsable du traitement</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le responsable du traitement des données personnelles est :
              </p>
              <ul className="list-none text-gray-700 space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
                <li><strong>Souk Africa</strong></li>
                <li>Rabat, Maroc</li>
                <li>Email : <a href="mailto:contact@soukafrica.ma" className="text-primary hover:underline">contact@soukafrica.ma</a></li>
                <li>Téléphone : +212 673 623 053</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Données collectées</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1 Données des structures enregistrées</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lorsqu'une structure s'inscrit sur la plateforme (via l'administration), nous collectons :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Informations commerciales :</strong> Nom de la structure, description, catégorie d'activité</li>
                <li><strong>Coordonnées :</strong> Adresse physique, pays, ville, numéro de téléphone, email, site web</li>
                <li><strong>Informations pratiques :</strong> Horaires d'ouverture</li>
                <li><strong>Contenus visuels :</strong> Photos et images de la structure</li>
                <li><strong>Produits et services :</strong> Descriptions, prix, images des produits proposés</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Données des visiteurs</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour les utilisateurs naviguant sur le site, nous collectons :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Données de navigation :</strong> Pages visitées, durée de visite, structures consultées</li>
                <li><strong>Données techniques :</strong> Adresse IP, type de navigateur, système d'exploitation, résolution d'écran</li>
                <li><strong>Cookies :</strong> Préférences utilisateur, statistiques de visite (voir section Cookies)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Données de contact</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lorsque vous nous contactez via le formulaire de contact, email ou WhatsApp :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone (si fourni)</li>
                <li>Contenu du message</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Finalités du traitement</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vos données sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Gestion de la plateforme :</strong> Référencement et affichage des structures, produits et annonces</li>
                <li><strong>Mise en relation :</strong> Faciliter le contact entre utilisateurs et structures (via téléphone, email, WhatsApp)</li>
                <li><strong>Amélioration du service :</strong> Analyse du comportement des utilisateurs pour optimiser l'expérience</li>
                <li><strong>Statistiques :</strong> Comptabilisation des vues, suivi des structures populaires via Google Analytics</li>
                <li><strong>Communication :</strong> Réponse aux demandes de contact et support technique</li>
                <li><strong>Obligations légales :</strong> Respect des lois en vigueur, notamment en matière de commerce et de protection des consommateurs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Base légale du traitement</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>L'exécution d'un contrat :</strong> Pour les structures enregistrées (collaboration commerciale)</li>
                <li><strong>L'intérêt légitime :</strong> Pour l'amélioration du service et les statistiques anonymisées</li>
                <li><strong>Le consentement :</strong> Pour l'utilisation de cookies non essentiels (analytics, préférences)</li>
                <li><strong>Les obligations légales :</strong> Conservation des données pour des raisons fiscales et juridiques</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Durée de conservation</h2>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-900 mb-3">
                  <strong>📊 Structures enregistrées :</strong>
                </p>
                <p className="text-green-800">
                  Les données des structures sont conservées pendant toute la durée de la collaboration avec Souk Africa. 
                  En cas de fin de collaboration, les données sont supprimées ou anonymisées dans un délai de 30 jours, 
                  sauf obligation légale de conservation plus longue.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-blue-900 mb-3">
                  <strong>👥 Visiteurs du site :</strong>
                </p>
                <p className="text-blue-800">
                  Les données de navigation et statistiques sont conservées pendant <strong>1 mois maximum</strong>, 
                  puis automatiquement supprimées ou anonymisées.
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                <p className="text-orange-900 mb-3">
                  <strong>📧 Messages de contact :</strong>
                </p>
                <p className="text-orange-800">
                  Les messages reçus via le formulaire de contact sont conservés pendant 1 an maximum 
                  pour assurer le suivi des demandes.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Partage des données</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Souk Africa ne partage pas vos données personnelles avec des tiers</strong>, sauf dans les cas suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Prestataires techniques :</strong> Hébergement du site, outils d'analyse (Google Analytics) - sous contrat de confidentialité</li>
                <li><strong>Obligation légale :</strong> Si requis par la loi ou une autorité compétente</li>
                <li><strong>Protection des droits :</strong> En cas de litige ou pour faire valoir nos droits légaux</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-900">
                  <strong>✅ Engagement :</strong> Nous ne vendons jamais vos données personnelles à des tiers à des fins commerciales ou marketing.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Sécurité des données</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Chiffrement des connexions (HTTPS/SSL)</li>
                <li>Sauvegardes régulières des données</li>
                <li>Accès restreint aux données (uniquement les administrateurs autorisés)</li>
                <li>Surveillance et mises à jour de sécurité régulières</li>
                <li>Hébergement sécurisé avec Supabase (certifié SOC 2, ISO 27001)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Cookies et technologies similaires</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le site utilise des cookies pour améliorer votre expérience et analyser le trafic. Les cookies utilisés sont :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (pas de consentement requis)</li>
                <li><strong>Cookies analytiques :</strong> Google Analytics pour comprendre l'utilisation du site (avec votre consentement)</li>
                <li><strong>Cookies de préférences :</strong> Mémorisation de vos choix (langue, consentement cookies, etc.)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vous pouvez gérer vos préférences de cookies à tout moment via notre{' '}
                <button className="text-primary hover:underline font-semibold">
                  gestionnaire de cookies
                </button>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Vos droits</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Conformément aux lois sur la protection des données, vous disposez des droits suivants :
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">✅ Droit d'accès</h4>
                  <p className="text-sm text-blue-800">Obtenir une copie de vos données personnelles</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">✏️ Droit de rectification</h4>
                  <p className="text-sm text-green-800">Corriger vos données inexactes ou incomplètes</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">🗑️ Droit à l'effacement</h4>
                  <p className="text-sm text-red-800">Demander la suppression de vos données</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">⛔ Droit d'opposition</h4>
                  <p className="text-sm text-purple-800">Vous opposer au traitement de vos données</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">📦 Droit à la portabilité</h4>
                  <p className="text-sm text-orange-800">Recevoir vos données dans un format structuré</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">⏸️ Droit à la limitation</h4>
                  <p className="text-sm text-yellow-800">Limiter le traitement de vos données</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@soukafrica.ma" className="text-primary hover:underline font-semibold">contact@soukafrica.ma</a>
              </p>
              <p className="text-gray-600 text-sm italic">
                Nous nous engageons à répondre à votre demande dans un délai de 30 jours maximum.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Transfert de données hors du Maroc</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Certaines données peuvent être transférées et stockées en dehors du Maroc, notamment :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li><strong>Supabase :</strong> Base de données hébergée dans des datacenters sécurisés (conformité RGPD)</li>
                <li><strong>Google Analytics :</strong> Analyse de trafic (données anonymisées)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ces transferts sont encadrés par des garanties appropriées (clauses contractuelles types, certifications).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Modifications de la politique</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques en matière de protection des données.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Contact</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles :
              </p>
              <ul className="list-none text-gray-700 space-y-2 mb-4 bg-green-50 p-4 rounded-lg">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <span>Email : <a href="mailto:contact@soukafrica.ma" className="text-primary hover:underline font-semibold">contact@soukafrica.ma</a></span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <span>WhatsApp : <a href="https://wa.me/212673623053" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">+212 673 623 053</a></span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Adresse : Rabat, Maroc</span>
                </li>
              </ul>
            </section>

          </div>
        </div>

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}