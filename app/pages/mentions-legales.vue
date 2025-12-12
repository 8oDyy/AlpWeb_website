<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

// SEO
useSeo({
  title: 'Mentions légales',
  description: 'Mentions légales du site AlpWeb. Informations sur l\'éditeur, l\'hébergeur et les conditions d\'utilisation.',
})

// Schema.org
useSchemaWebPage({
  name: 'Mentions légales',
  description: 'Mentions légales du site AlpWeb.',
})
</script>

<template>
  <div class="container-alp py-32">
    <h1 class="text-4xl font-bold font-display mb-8">
      Mentions légales
    </h1>

    <div class="prose prose-lg max-w-none">
      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Éditeur du site
        </h2>
        <p class="text-alp-black-muted mb-4">
          <!-- TODO: Remplir avec les informations de l'entreprise -->
          <strong>AlpWeb</strong><br>
          Forme juridique : [TODO: À compléter]<br>
          Capital social : [TODO: À compléter]<br>
          Siège social : [TODO: Adresse à compléter]<br>
          SIRET : [TODO: À compléter]<br>
          RCS : [TODO: À compléter]<br>
          N° TVA intracommunautaire : [TODO: À compléter]
        </p>
        <p class="text-alp-black-muted">
          Directeur de la publication : [TODO: Nom du responsable]<br>
          Contact : <a
            href="mailto:contact@alpweb.fr"
            class="text-alp-black hover:underline"
          >contact@alpweb.fr</a>
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Hébergement
        </h2>
        <p class="text-alp-black-muted">
          <!-- TODO: Remplir avec les informations de l'hébergeur -->
          Ce site est hébergé par :<br>
          [TODO: Nom de l'hébergeur]<br>
          [TODO: Adresse de l'hébergeur]<br>
          [TODO: Téléphone de l'hébergeur]
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Propriété intellectuelle
        </h2>
        <p class="text-alp-black-muted">
          L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé par le droit d'auteur.
          Toute reproduction, représentation, modification ou exploitation non autorisée est interdite.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold font-display mb-4">
          Limitation de responsabilité
        </h2>
        <p class="text-alp-black-muted">
          AlpWeb s'efforce d'assurer l'exactitude des informations diffusées sur ce site.
          Toutefois, AlpWeb ne peut garantir l'exactitude, la complétude et l'actualité des informations.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold font-display mb-4">
          Crédits
        </h2>
        <p class="text-alp-black-muted">
          Conception et développement : AlpWeb<br>
          <!-- TODO: Ajouter les crédits photos/illustrations si applicable -->
        </p>
      </section>
    </div>
  </div>
</template>
