// src/app/conditions/page.js
'use client';

export default function Conditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📜 Conditions Générales d'Utilisation
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
                ℹ️ En accédant et en utilisant le site Souk Africa, vous acceptez les présentes conditions générales d'utilisation sans réserve.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Objet</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation du site <strong>Souk Africa</strong>, accessible à l'adresse www.soukafrica.ma.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Souk Africa est une plateforme gratuite de mise en relation ouverte à tous — entreprises, commerçants et particuliers — permettant de :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Découvrir des structures commerciales au Maroc (restaurants, salons, boutiques, services, artisans)</li>
                <li>Consulter des produits et articles proposés par ces structures</li>
                <li>Accéder à des annonces professionnelles (emplois, formations, événements, appels d'offres)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Accès au site</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.1 Accès libre et gratuit</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                L'accès au site Souk Africa est <strong>libre et gratuit</strong>. Aucune inscription n'est requise pour consulter les structures, produits et annonces.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Disponibilité</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous nous efforçons de maintenir le site accessible 24h/24 et 7j/7. Toutefois, l'accès peut être temporairement suspendu pour :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Maintenance technique</li>
                <li>Mises à jour du système</li>
                <li>Problèmes techniques indépendants de notre volonté</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Souk Africa ne saurait être tenue responsable de toute interruption temporaire ou définitive du service.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Prérequis techniques</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour accéder au site, vous devez disposer :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>D'une connexion internet</li>
                <li>D'un navigateur web récent (Chrome, Firefox, Safari, Edge)</li>
                <li>D'un appareil compatible (ordinateur, tablette, smartphone)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Utilisation du site</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.1 Utilisation conforme</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vous vous engagez à utiliser le site de manière conforme à sa finalité et aux lois en vigueur. Il est notamment interdit de :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Utiliser le site à des fins illégales ou frauduleuses</li>
                <li>Diffuser des contenus illicites, diffamatoires, violents ou pornographiques</li>
                <li>Tenter de perturber le fonctionnement du site (piratage, virus, spam)</li>
                <li>Copier, reproduire ou exploiter commercialement le contenu du site sans autorisation</li>
                <li>Usurper l'identité d'une structure ou d'un tiers</li>
                <li>Collecter des données personnelles sans consentement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Pas de compte utilisateur requis</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Souk Africa ne nécessite <strong>pas d'inscription</strong> pour les visiteurs. Vous pouvez librement consulter :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Les fiches des structures (restaurants, salons, boutiques, etc.)</li>
                <li>Les produits et leurs prix</li>
                <li>Les annonces professionnelles</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Publication de contenu</h2>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                <p className="text-orange-900 font-semibold mb-2">
                  ⚠️ Restriction importante
                </p>
                <p className="text-orange-800">
                  Actuellement, seuls les <strong>administrateurs de Souk Africa</strong> peuvent publier du contenu 
                  (structures, produits, annonces). Les utilisateurs ne peuvent pas créer de compte ni publier directement.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.1 Demande de référencement</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si vous souhaitez que votre structure soit référencée sur Souk Africa, vous pouvez nous contacter :
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
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Modération du contenu</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tout contenu publié sur Souk Africa est soumis à une <strong>validation par les administrateurs</strong> avant publication. 
                Nous nous réservons le droit de :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Refuser ou supprimer tout contenu inapproprié, illégal ou non conforme</li>
                <li>Modifier les informations pour améliorer leur qualité ou leur exactitude</li>
                <li>Retirer toute structure, produit ou annonce à notre discrétion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Transactions et paiements</h2>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <p className="text-green-900 font-semibold mb-2">
                  ✅ Aucune transaction en ligne
                </p>
                <p className="text-green-800">
                  Souk Africa est une <strong>plateforme de mise en relation uniquement</strong>. 
                  Nous ne gérons aucune transaction financière, aucun paiement en ligne, et ne percevons aucune commission.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.1 Mise en relation directe</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le site permet aux utilisateurs de contacter directement les structures via :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Téléphone</li>
                <li>WhatsApp</li>
                <li>Email</li>
                <li>Visite physique (adresse fournie)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.2 Responsabilité des transactions</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les échanges commerciaux se font <strong>directement entre l'utilisateur et la structure</strong>. 
                Souk Africa n'est pas partie prenante de ces transactions et ne peut être tenue responsable :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>De la qualité des produits ou services</li>
                <li>Du respect des engagements commerciaux</li>
                <li>Des litiges entre acheteurs et structures</li>
                <li>Des problèmes de livraison, retour ou remboursement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Propriété intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                L'ensemble des éléments du site Souk Africa (design, logos, textes, graphismes, code source) sont protégés par le droit d'auteur.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Toute reproduction, représentation, modification ou exploitation sans autorisation expresse est interdite et constitue une contrefaçon.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.1 Contenus des structures</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les photos, descriptions et informations publiées par les structures restent la propriété de leurs auteurs. 
                En acceptant le référencement, les structures accordent à Souk Africa le droit de diffuser ces contenus sur la plateforme.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Responsabilité</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.1 Exactitude des informations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous veillons à la fiabilité des informations publiées, mais ne pouvons garantir leur exactitude absolue. 
                Les structures sont responsables de l'actualisation de leurs informations (horaires, prix, coordonnées).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.2 Limitation de responsabilité</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Souk Africa ne peut être tenue responsable :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Des erreurs ou omissions dans les contenus publiés</li>
                <li>De l'interruption temporaire ou définitive du service</li>
                <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
                <li>Des actes des structures référencées</li>
                <li>Des virus ou logiciels malveillants provenant de liens externes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.3 Liens externes</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le site peut contenir des liens vers des sites tiers. Souk Africa n'est pas responsable du contenu de ces sites externes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Données personnelles</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La collecte et le traitement de vos données personnelles sont régis par notre{' '}
                <a href="/confidentialite" className="text-primary hover:underline font-semibold">
                  Politique de Confidentialité
                </a>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                En utilisant le site, vous consentez à la collecte et au traitement de vos données conformément à cette politique.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visite (Google Analytics).
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vous pouvez gérer vos préférences de cookies via notre{' '}
                <button className="text-primary hover:underline font-semibold">
                  gestionnaire de cookies
                </button>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Modification des CGU</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Souk Africa se réserve le droit de modifier les présentes CGU à tout moment. 
                Les modifications entrent en vigueur dès leur publication sur le site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Il est de votre responsabilité de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                La poursuite de l'utilisation du site après modification des CGU vaut acceptation des nouvelles conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Droit applicable et juridiction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les présentes CGU sont régies par le droit marocain.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                En cas de litige relatif à l'interprétation ou à l'exécution des présentes, et à défaut d'accord amiable, 
                les tribunaux de <strong>Rabat, Maroc</strong> seront seuls compétents.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Contact</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour toute question concernant ces conditions d'utilisation :
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

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-blue-900 font-semibold">
                ✅ En utilisant Souk Africa, vous reconnaissez avoir lu, compris et accepté les présentes Conditions Générales d'Utilisation.
              </p>
            </div>

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