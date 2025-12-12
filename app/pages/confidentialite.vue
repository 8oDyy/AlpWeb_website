<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

// SEO
useSeo({
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles du site AlpWeb. Conformé RGPD.',
})

// Schema.org
useSchemaWebPage({
  name: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles.',
})
</script>

<template>
  <div class="container-alp py-32">
    <h1 class="text-4xl font-bold font-display mb-8">
      Politique de confidentialité
    </h1>

    <div class="prose prose-lg max-w-none">
      <p class="text-alp-black-muted mb-8">
        Dernière mise à jour : [TODO: Date de mise à jour]
      </p>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Introduction
        </h2>
        <p class="text-alp-black-muted">
          AlpWeb s'engage à protéger la vie privée des utilisateurs de son site.
          Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Responsable du traitement
        </h2>
        <p class="text-alp-black-muted">
          <!-- TODO: Remplir avec les informations du responsable -->
          Le responsable du traitement des données est :<br>
          <strong>AlpWeb</strong><br>
          [TODO: Adresse]<br>
          Email : <a
            href="mailto:contact@alpweb.fr"
            class="text-alp-black hover:underline"
          >contact@alpweb.fr</a>
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Données collectées
        </h2>
        <p class="text-alp-black-muted mb-4">
          Nous pouvons collecter les données suivantes :
        </p>
        <ul class="list-disc list-inside text-alp-black-muted space-y-2">
          <li>Données de navigation (adresse IP, navigateur, pages visitées)</li>
          <li>Données fournies via le formulaire de contact (nom, email, message)</li>
          <li>Cookies techniques nécessaires au fonctionnement du site</li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Finalités du traitement
        </h2>
        <p class="text-alp-black-muted mb-4">
          Vos données sont utilisées pour :
        </p>
        <ul class="list-disc list-inside text-alp-black-muted space-y-2">
          <li>Répondre à vos demandes de contact</li>
          <li>Améliorer notre site et nos services</li>
          <li>Assurer la sécurité du site</li>
          <li>Analyser la fréquentation du site (si analytics activé)</li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Durée de conservation
        </h2>
        <p class="text-alp-black-muted">
          Les données de contact sont conservées pendant 3 ans à compter du dernier contact.
          Les données de navigation sont conservées pendant 13 mois maximum.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Vos droits
        </h2>
        <p class="text-alp-black-muted mb-4">
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul class="list-disc list-inside text-alp-black-muted space-y-2">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité</li>
          <li>Droit d'opposition</li>
        </ul>
        <p class="text-alp-black-muted mt-4">
          Pour exercer ces droits, contactez-nous à : <a
            href="mailto:contact@alpweb.fr"
            class="text-alp-black hover:underline"
          >contact@alpweb.fr</a>
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Cookies
        </h2>
        <p class="text-alp-black-muted">
          Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.
          Aucun cookie publicitaire ou de tracking tiers n'est utilisé sans votre consentement.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold font-display mb-4">
          Contact
        </h2>
        <p class="text-alp-black-muted">
          Pour toute question concernant cette politique de confidentialité, contactez-nous à :
          <a
            href="mailto:contact@alpweb.fr"
            class="text-alp-black hover:underline"
          >contact@alpweb.fr</a>
        </p>
      </section>
    </div>
  </div>
</template>
