/**
 * Vuetify3 Plugin
 */
import { createVuetify } from "vuetify";

// Data Table
import { VDataTable } from 'vuetify/labs/VDataTable'

// Misc
import { loadFonts } from "./webfontloader";
loadFonts();

// Styles
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: "#811429",
    sidebar: "#004761",
    button_blue: "#118ACB",
    silver: "#D5DFE7",
    red_links: "#811429",
    yellow_cards: "#F9C634",
    blue: "#196CA2",
    yellow: "#F8C545",
    darkblue: "#032F45",
  },
};

const vuetify = createVuetify({
  components: {
    VDataTable,
  },
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
  },
  typography:{
    fontFamily: '"Sofia Sans", sans-serif'
  }
});

export default vuetify;
