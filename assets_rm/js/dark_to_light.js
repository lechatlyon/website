/**
* Fonction utilitaire pour calculer le réglage actuel du thème.
* Recherche d'une valeur de stockage locale.
* Revenir au réglage du système.
* Revenir au mode d'éclairage.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }
  
  /**
  * Fonction utilitaire pour mettre à jour le texte du bouton et l'étiquette aria.
  */
  function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "Thème light" : "Thème dark";
    // utilisez un aria-label si vous omettez le texte sur le bouton
    // et que vous utilisez une icône de soleil ou de lune, par exemple
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
  }
  
  /**
  * Fonction utilitaire pour mettre à jour les paramètres du thème sur la balise html
  */
  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
  
  
  /**
  * Au chargement de la page :
  */
  
  /**
  * 1. Récupérer ce dont nous avons besoin dans le DOM et les paramètres du système au chargement de la page
  */
  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  /**
  * 2. Déterminer les paramètres actuels du site
  */
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
  /**
  * 3. Mettre à jour les paramètres du thème et le texte du bouton en fonction des paramètres actuels
  */
  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
  
  /**
  * 4. Ajouter un récepteur d'événement pour basculer le thème
  */
  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  }); 