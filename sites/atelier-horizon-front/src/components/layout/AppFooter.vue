<script setup lang="ts">
import { Mail, Phone, MapPin, ExternalLink } from '@lucide/vue';
</script>

<template>
  <footer class="bg-[#0F172A] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <!-- Brand -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-10 h-10 bg-[#6B8E7A] rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">AH</span>
            </div>
            <span class="text-xl font-semibold">Atelier Horizon</span>
          </div>
          <p class="text-gray-400 leading-relaxed">
            Conseil stratégique pour entrepreneurs et dirigeants qui souhaitent
            clarifier leur vision et accélérer leur croissance.
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-semibold mb-4">Navigation</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-[#6B8E7A] transition-colors">Accueil</a></li>
            <li><a href="#" class="hover:text-[#6B8E7A] transition-colors">À propos</a></li>
            <li><a href="#" class="hover:text-[#6B8E7A] transition-colors">Offres</a></li>
            <li><a href="#" class="hover:text-[#6B8E7A] transition-colors">Méthode</a></li>
            <li><a href="#" class="hover:text-[#6B8E7A] transition-colors">Témoignages</a></li>
            <li><a href="#" class="hover:text-[#6B8E7A] transition-colors">Contact</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold mb-4">Contact</h4>
          <ul class="space-y-3 text-gray-400">
            <li class="flex items-center space-x-3">
              <a href="mailto:contact@atelier-horizon.fr" class="flex items-center space-x-3 hover:text-[#6B8E7A] transition-colors">
                <Mail class="w-5 h-5 text-[#6B8E7A]" />
                <span>contact@atelier-horizon.fr</span>
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <a href="tel:+33612345678" class="flex items-center space-x-3 hover:text-[#6B8E7A] transition-colors">
                <Phone class="w-5 h-5 text-[#6B8E7A]" />
                <span>+33 6 12 34 56 78</span>
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <a href="https://maps.app.goo.gl/5HEVpcXTER8r2Jde6" target="_blank" rel="noopener noreferrer" class="flex items-center space-x-3 hover:text-[#6B8E7A] transition-colors">
                <MapPin class="w-5 h-5 text-[#6B8E7A]" />
                <span>Paris, France</span>
              </a>
            </li>
            <li class="flex items-center space-x-3 pt-2">
              <a
                href="#"
                class="p-2 bg-white/10 rounded-lg hover:bg-[#6B8E7A] transition-colors"
                aria-label="LinkedIn"
              >
                <ExternalLink class="w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Atelier Horizon. Tous droits réservés. Site créé par <a href="https://www.torefi.fr" target="_blank" rel="noopener noreferrer" class="hover:text-[#6B8E7A] transition-colors">Toréfi</a></p>
      </div>
    </div>
  </footer>
</template>
