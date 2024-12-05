
Denna README.md-fil dokumenterar sprintplaneringen och sprintöversikten för vårt team under de kommande fyra veckorna. Teammedlemmarna är:
- Linus
- Isak
- Jacob

## Sprint Struktur

### Sprint Planering (Måndag - Fredag)
- **Måndagar**: Sprint Planning-möte där vi går igenom och planerar veckans arbete. Vi diskuterar mål, uppgifter och prioriteringar.
- **Tisdag - Torsdag**: Daily Scrum-möten, där varje teammedlem kort uppdaterar om vad de gjort, vad de planerar att göra och eventuella hinder de stöter på.
- **Fredag**: Sprint Review där vi går igenom vad som har uppnåtts under veckan och samlar in feedback. Eventuella förbättringar diskuteras och dokumenteras.

### Daily Scrum (Tisdag - Torsdag)
- **Tid**: Klockan 10:00 (Vi kodar bäst på natten) varje vardag (tisdag - torsdag).
- **Syfte**: Att snabbt synkronisera och identifiera eventuella hinder som kan påverka sprintens framsteg.
- **Agenda**:
  - Vad har jag gjort sedan sist?
  - Vad planerar jag att göra idag?
  - Finns det några hinder som behöver lösas?

---

## Sprint 1 - Vecka 1 (Startdatum: 2024-11-11)

### Sprint Planning (Måndag)
- **Mål**: Definiera veckans mål och uppgifter.
- **Teammedlemmar**: Linus, Isak, Jacob.
- **Diskussioner**:
  - Vad ska prioriteras under denna vecka?
    Skapa repo, project board, skriva issues, bygga roadmap för alla anrop och rita wireframes. Går inte bygga hus utan grund! 
  - Vilka uppgifter har högsta prioritet? 
    Wireframes och få Jespers godkännande.
  - Förväntade hinder och lösningar.
    Sömnbrist. Koffein.

### Daily Scrum (Tisdag - Torsdag)

#### Tisdag (2024-11-12)
| Teammedlem | Vad har jag gjort sedan sist?                                                                                         | Vad ska jag göra idag?                                 | Finns det några hinder?               |
|------------|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|---------------------------------------|
| Linus      | Grupprepo, project board, React boilerplates och mappstruktur. Allmän förberedelse inför tyngre kodning. Och denna README.md-mall! | Mer kodförberedelse, ostylade komponenter, global CSS, etc. | Inte än.                              |
| Isak       | Backend boilerplate, infrastruktur, services och grundläggande funktioner implementerade.                            | Fortsätta utveckla backend-strukturen och optimera tjänster | Nej!                                  |
| Jacob      | Lo-fi wireframes färdiga, valt ikonbibliotek och fastställt färger och stylingstrategier.                            | Fortsätta med Hi-Fi wireframes och detaljerad design i Figma  | Inga hinder.                          |


#### Onsdag (2024-11-13)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |           Mappstruktur, boilerplates, testanrop från mockup, förberedlser inför vår första getanrop.                   |  Testa vårt första get-anrop och fortsätta med förberedlser inför kodning i react.                      |   Nej.                      |
| Isak       |        Mycket backend arbete, handlers utifrån flow charten, alla är inte kompletta men på god väg att bli. Också pysslat med middy.                      |     Fortsätta med backend                   |    Nej                     |
| Jacob      |           Tagit fram illustrationer på ikoner och grafik vi ska använda oss av, gjort en high-fi layout samt tänkt ut mer grundligt hur UI/UX skall va.                   |  Fortsätta med UI/UX                      |         Nej                |

#### Torsdag (2024-11-14)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |            Bråkat med cors. Fått menyn renderad till webbläsaren. Fixat menuAPI, menuPage & menuItem funktioner.                  |   Bygga vars för CSS följt av att börja styla menuPage & menuItem.                    |  Nej                       |
| Isak       |          Backend, cors bugg fix, försöker få in middy in allt. Yaml-file struktur. Börjat på cognito-issuen.                  |     Fortsätta med cognito                   |    Nej.                     |
| Jacob      |           Hi-fi wireframes                   |          Fortsätta med detaljerad hi-fi              |         Nej.                |


### Sprint Review (Fredag)
- **Resultat**:
  - Vad har uppnåtts under veckan?
    Hi-fi figma skiss, flow-chart, grundlig react kod. Menu, sliders, api anrop, navigering.
  - Vad fungerade bra, och vad kan förbättras?
    Det mesta har fungerat bra men vi har hade bristfällig kommunkation vid ett tillfälle.
- **Feedback**:
  - Ge och ta emot feedback från alla teammedlemmar.
  Done. Samtalet dokumenteras ej.
  - Identifiera åtgärder för förbättring inför nästa vecka.
  Vi identiferade problemet, diskuterade det, löste det. Ses nästa vecka!

---

## Sprint 2 - Vecka 2 (Startdatum: 2024-11-18)

### Sprint Planning (Måndag)
- **Mål**: Definiera veckans mål och uppgifter.
- **Teammedlemmar**: Linus, Isak, Jacob.
- **Diskussioner**:
  - Vad ska prioriteras under denna vecka?
  - Vilka uppgifter har högsta prioritet?
  - Förväntade hinder och lösningar.

### Daily Scrum (Tisdag - Torsdag)

#### Tisdag (2024-11-19)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |                Contact-page/about              |   Avsluta gårdagens projekt och påbörja cart.js                     |      Tennis kl 17:00                   |
| Isak       |                 Fungerande inlogg             |         Bilder till menu db               |           Nej.              |
| Jacob      |                  Skiss och diverse frontend            |        Namnge matkatategorier och göra nav                |           Nej.              |

#### Onsdag (2024-11-20)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |             CartStore med Zustand, localstorage, skickas till CartPage.                 |     Mer frontend issues                   |        Nej                 |
| Isak       |                        Placeorder handler och api fil för placeorder, and it works! Token validation feature.    | Serverless work. Mappstruktur. Ta en kik op JOI.   |        Nej.           |
| Jacob      |          Utökade produkterna och kategorier, jobbat med att få bilder till produkterna. Allmänt CSS arbete.          |          NAV-barmenu & collapse menu.              |           Bilderna krånglar, gemensam felsökning behövs.              |

#### Torsdag (2024-11-21)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |      Cartpage påbörjat.                        |        Cartpage och productview page.                |         Nej, tid kanske. CSS tar tid.                |
| Isak       |                   Order confirmation function           |                 Staff notes & protected routes.       |        Nej.                 |
| Jacob      |        Header / Nav och en slider menu.                      |     Fortsätta med gårdagen och avsluta.                   |        Behöver möjligtvis hjälp.                 |

### Sprint Review (Fredag)
- **Resultat**:
  - Vad har uppnåtts under veckan? Login function, majoriteten av frontend pages. Navigation. Cart. Zustand. 
  - Vad fungerade bra, och vad kan förbättras? Alla har bidragit mycket och vi visar samma engangemang. Git kan vi möjligtvis bli bättre på. 
- **Feedback**:
  - Ge och ta emot feedback från alla teammedlemmar. Linus sprider positiv feedback. Kommunikationen har stärkts under veckan. 
  - Identifiera åtgärder för förbättring inför nästa vecka. En issue för varje enstaka sak och regelbundna commits. Gå igenom flowchart så den även passar med design flowcharten så dom är på samma bana. 

---

## Sprint 3 - Vecka 3 (Startdatum: 2024-11-25)

### Sprint Planning (Måndag)
- **Mål**: Definiera veckans mål och uppgifter.
- **Teammedlemmar**: Linus, Isak, Jacob.
- **Diskussioner**:
  - Vad ska prioriteras under denna vecka? Avslutade kundflödet och påbörja staff-flödet. 
  - Vilka uppgifter har högsta prioritet? Kundflödet. 
  - Förväntade hinder och lösningar. Inte ännu. 

### Daily Scrum (Tisdag - Torsdag)

#### Tisdag (2024-11-26)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |            Home-page sidan                  |   Justera den sista styling och eventuellt börja med ui för staff.                     |                         |
| Isak       |                  Api request file, staff order confirm, refresh order status med testknapp, x-cognito-id, order status handler, gosi orders table, sorts key to gsi, api request file get orders, test buttons fetch orders och buggfix med Jacob.          |                        |    Resercha lösningar för kommande utmaningar. Möjligtvis påbörja lite ui i frontend.                     |
| Jacob      |            OrderConfirm Page, påbörjat edit order component. Buggfix                  |   Edit order component                     |          Kan möjligtvis behöva hjälp.               |

#### Onsdag (2024-11-27)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |       Home-page                       |     Vila & frontend                   |       Sjukdom                  |
| Isak       |       ny zustand store för order, småfix                       |     Mer av den typen                   |         Nej.                |
| Jacob      |  Hjälpt Isak                            |        staff-dashboard-page                |            Nej.             |

#### Torsdag (2024-11-28)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |       Pending-order ui & vilat                       |     Kanske vila mer, pending-order-item-ui                   |   Feber                      |
| Isak       |        Current order state. Orders table GSI. Order history request. Order history handler and route. Update order handler / request. Cart btn update. Conditionally render refresh button.                      |       Kolla på design med Jacob, confirm-order button-function. Order-history                 |  Nej.                       |
| Jacob      |          Global-css, dashboard-page, lite routes för cart-btn o design                    |  Design för order-history                      |    Nej.                     |

### Sprint Review (Fredag)
- **Resultat**:
  - Vad har uppnåtts under veckan?  Knytit ihop kundens användarflöde. 
  - Vad fungerade bra, och vad kan förbättras? Vi har förbättras på kommunikation och vågar ställa på varann. Vi hade kunnat bli överens om konventioner tidiagare. 
- **Feedback**:
  - Ge och ta emot feedback från alla teammedlemmar. Det har vi tagit på discord.
  - Identifiera åtgärder för förbättring inför nästa vecka. Vi har inga nya förbättringar i nuläget.

---

## Sprint 4 - Vecka 4 (Startdatum: 2024-12-02)

### Sprint Planning (Måndag)
- **Mål**: Definiera veckans mål och uppgifter. Göra klart backend och staff-flödet. 
- **Teammedlemmar**: Linus, Isak, Jacob.
- **Diskussioner**:
  - Vad ska prioriteras under denna vecka? All form av flöde, så vi tar finputset till sista veckan. 
  - Vilka uppgifter har högsta prioritet? Flödet. 
  - Förväntade hinder och lösningar. Nej men det kommer säkert att uppstå. 

### Daily Scrum (Tisdag - Torsdag)

#### Tisdag (2024-12-03)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |                     activeOrderPage         |         Fortsätta               |     Nej.                    |
| Isak       |                 Request & Handler till pending-order.             |            Cancel-order            |      Nej.                   |
| Jacob      |        Global-css styling och fix                      |         Frontend               |             Motivation            |

#### Onsdag (2024-12-04)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |                     Pending-order & Active-order rework         |     About-rework                    |      Nej.                   |
| Isak       |                   Joi, user-group staff cognito, navigate staff to dashboard vid login, validering på staff request handlers, route wrapper för staff-routes. feedback-component, feedback zustandstore. samt implementerat dem.           |       CSP research & s3 bucket research                 |               Nej.          |
| Jacob      |                  Broken interface, global styling            |            Fortsätta            |        Nej.                 |

#### Torsdag (2024-12-05)
| Teammedlem | Vad har jag gjort sedan sist? | Vad ska jag göra idag? | Finns det några hinder? |
|------------|------------------------------|------------------------|-------------------------|
| Linus      |                 order-conformatin rework, name changes             |      avsluta gårdagen, ändra slider item antal. med mer.  Show-total-price.                |  Nej.                       |
| Isak       |                    CSP research. Skapat domain i route-53, SSL-certifikat via ACN. Hostad sidan i S3. Cloudfrount disruption. DNS config i route-53          |             Implementera CSP i s3.           |     Nej.                    |
| Jacob      |               Responsivitet layout fix över hela sidan, implementerade globala variabler CSS.               |     CSS-fix och finslip.                   |     Nej.                    |

### Sprint Review (Fredag)
- **Resultat**:
  - Vad har uppnåtts under veckan?
  - Vad fungerade bra, och vad kan förbättras?
- **Feedback**:
  - Ge och ta emot feedback från alla teammedlemmar.
  - Identifiera åtgärder för förbättring inför nästa vecka.

---

## Sammanfattning och Reflektion
- **Vad har vi lärt oss?**: En reflektion över hela sprintcykeln. Vilka metoder har fungerat bäst för oss?
- **Vad kan förbättras?**: Identifiera områden som kan förbättras inför nästa sprint.
- **Förberedelse för nästa sprint**: Vad ska vi fokusera på i nästa sprintcykel?

---


