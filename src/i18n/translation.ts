interface Resources {
  [key: string]: Language
}

interface Language {
  [key: string]: Dictionary
}

interface Dictionary {
  Maths: string
  ABCs: string
  difficulty: string
  Easy: string
  Medium: string
  Hard: string
  Advanced: string
  uppercase: string
  lowercase: string
  Pages: string
  Problems: string
  'Included Operators': string
  'Included Declensions': string
  Name: string
  Date: string
  Answer: string
  Randomize: string
  Print: string
  Zhuyin: string
  Words: string
  Nouns: string
  Verbs: string
  'Word Problems': string
  'wp-names': string
  'wp-items': string
  // Item 2-number
  'wp-add-1': string; 'wp-add-2': string; 'wp-add-3': string; 'wp-add-4': string
  'wp-add-5': string; 'wp-add-6': string; 'wp-add-7': string; 'wp-add-8': string
  'wp-sub-1': string; 'wp-sub-2': string; 'wp-sub-3': string; 'wp-sub-4': string
  'wp-sub-5': string; 'wp-sub-6': string; 'wp-sub-7': string; 'wp-sub-8': string
  // Money
  'wp-money-add-1': string; 'wp-money-add-2': string; 'wp-money-add-3': string
  'wp-money-sub-1': string; 'wp-money-sub-2': string; 'wp-money-sub-3': string
  // Time
  'wp-time-add-1': string; 'wp-time-add-2': string
  'wp-time-sub-1': string; 'wp-time-sub-2': string
  // Measurement
  'wp-meas-add-1': string; 'wp-meas-add-2': string
  'wp-meas-sub-1': string; 'wp-meas-sub-2': string
  // 3-number
  'wp-add3-1': string; 'wp-add3-2': string; 'wp-add3-3': string
  'wp-sub3-1': string; 'wp-sub3-2': string; 'wp-sub3-3': string
  'wp-mix3-1': string; 'wp-mix3-2': string
  // Story (long paragraph)
  'wp-story-add-1': string; 'wp-story-add-2': string; 'wp-story-add-3': string
  'wp-story-sub-1': string; 'wp-story-sub-2': string; 'wp-story-sub-3': string
  // Decimals
  'wp-dec-add-1': string; 'wp-dec-add-2': string
  'wp-dec-sub-1': string; 'wp-dec-sub-2': string
  // Comparison
  'wp-cmp-1': string; 'wp-cmp-2': string; 'wp-cmp-3': string
  'wp-cmp-hint': string
  'wp-cmp-red': string
  'wp-cmp-blue': string
}

export const resources: Resources = {
  en: {
    translation: {
      Maths: 'Maths',
      ABCs: 'ABCs',
      difficulty: 'Difficulty',
      Easy: 'Easy',
      Medium: 'Medium',
      Hard: 'Hard',
      Advanced: 'Advanced',
      uppercase: 'Uppercase',
      lowercase: 'Lowercase',
      Pages: 'Pages',
      Problems: 'Problems',
      'Included Operators': 'Included Operators',
      'Included Declensions': 'Included Declensions',
      Name: 'Name',
      Date: 'Date',
      Answer: 'Answer',
      Randomize: 'Randomize',
      Print: 'Print',
      Zhuyin: 'Bopomofo',
      Words: 'Words',
      Nouns: 'Nouns',
      Verbs: 'Verbs',
      'Word Problems': 'Word Problems',
      'wp-names':
        'Tom|Sara|Max|Lily|Ben|Mia|Jake|Emma|Leo|Zoe|Sam|Ava|Jack|Maya|Ali|Noah|Grace|Owen|Ruby|Finn',
      'wp-items':
        'apples|marbles|coins|shells|stickers|feathers|buttons|leaves|ribbons|badges|tokens|gems|seeds|acorns|crayons|flowers|pebbles|stamps|beads|pinecones|cards|balloons|books|pencils',

      // ── Item 2-number ──────────────────────────────────────────────────────
      'wp-add-1': '{{name1}} has {{a}} {{item}}. {{name2}} gives {{name1}} {{b}} more {{item}}. How many {{item}} does {{name1}} have now?',
      'wp-add-2': 'There are {{a}} {{item}} in the box. {{name1}} puts {{b}} more {{item}} into the box. How many {{item}} are in the box now?',
      'wp-add-3': '{{name1}} found {{a}} {{item}} and {{name2}} found {{b}} {{item}}. How many {{item}} did they find altogether?',
      'wp-add-4': '{{name1}} collected {{a}} {{item}} in the morning and {{b}} more in the afternoon. How many {{item}} did {{name1}} collect in all?',
      'wp-add-5': 'There are {{a}} red {{item}} and {{b}} blue {{item}} in the basket. How many {{item}} are in the basket altogether?',
      'wp-add-6': '{{name1}} has {{a}} {{item}} in the blue jar and {{b}} {{item}} in the red jar. How many {{item}} does {{name1}} have in total?',
      'wp-add-7': '{{name1}} picked {{a}} {{item}} at the park and {{b}} {{item}} at the beach. How many {{item}} did {{name1}} pick altogether?',
      'wp-add-8': "{{name1}}'s bag has {{a}} {{item}} and {{name2}}'s bag has {{b}} {{item}}. How many {{item}} do they have between them?",

      'wp-sub-1': '{{name1}} had {{a}} {{item}}. {{name1}} gave {{b}} {{item}} to {{name2}}. How many {{item}} does {{name1}} have left?',
      'wp-sub-2': 'There were {{a}} {{item}} on the shelf. {{b}} of them fell off. How many {{item}} are still on the shelf?',
      'wp-sub-3': '{{name1}} started with {{a}} {{item}} and used {{b}} of them. How many {{item}} does {{name1}} still have?',
      'wp-sub-4': 'A jar had {{a}} {{item}} in it. {{name1}} took out {{b}} {{item}}. How many {{item}} are left in the jar?',
      'wp-sub-5': '{{name1}} had {{a}} {{item}}. {{b}} of them were damaged. How many {{item}} were not damaged?',
      'wp-sub-6': '{{name1}} has {{a}} {{item}} and {{name2}} has {{b}} {{item}}. How many more {{item}} does {{name1}} have than {{name2}}?',
      'wp-sub-7': '{{name1}} wants to collect {{a}} {{item}} in total. So far {{name1}} has {{b}} {{item}}. How many more {{item}} does {{name1}} need?',
      'wp-sub-8': '{{name1}} has {{a}} {{item}} and {{name2}} has {{b}} {{item}}. How many more {{item}} would {{name2}} need to have the same as {{name1}}?',

      // ── Money ──────────────────────────────────────────────────────────────
      'wp-money-add-1': '{{name1}} had {{a}} dollars. {{name2}} gave {{name1}} {{b}} dollars as a birthday gift. How many dollars does {{name1}} have now?',
      'wp-money-add-2': '{{name1}} earned {{a}} dollars raking leaves and {{b}} dollars washing the car. How many dollars did {{name1}} earn in total?',
      'wp-money-add-3': '{{name1}} saved {{a}} dollars in January and {{b}} dollars in February. How much money did {{name1}} save altogether?',
      'wp-money-sub-1': '{{name1}} had {{a}} dollars and spent {{b}} dollars at the bookshop. How many dollars does {{name1}} have left?',
      'wp-money-sub-2': '{{name1}} had {{a}} dollars. After paying {{b}} dollars for a new game, how much money does {{name1}} have?',
      'wp-money-sub-3': 'The school raised {{a}} dollars for charity. They spent {{b}} dollars on supplies. How much money is left for charity?',

      // ── Time ───────────────────────────────────────────────────────────────
      'wp-time-add-1': '{{name1}} spent {{a}} minutes reading and {{b}} minutes colouring. How many minutes did {{name1}} spend on these activities in total?',
      'wp-time-add-2': 'It took {{name1}} {{a}} minutes to walk to the shops and {{b}} minutes to walk back home. How many minutes did {{name1}} spend walking in total?',
      'wp-time-sub-1': 'A film is {{a}} minutes long. {{name1}} has already watched {{b}} minutes. How many more minutes until the film is finished?',
      'wp-time-sub-2': '{{name1}} planned to practise piano for {{a}} minutes. After practising for {{b}} minutes, how many more minutes does {{name1}} still need to practise?',

      // ── Measurement ────────────────────────────────────────────────────────
      'wp-meas-add-1': '{{name1}} cut a piece of string {{a}} cm long and another piece {{b}} cm long. What is the total length of both pieces?',
      'wp-meas-add-2': "The path from {{name1}}'s home to the park is {{a}} metres long. From the park to the library is {{b}} metres. How far is it from {{name1}}'s home to the library?",
      'wp-meas-sub-1': 'A plank of wood is {{a}} cm long. {{name1}} saws off {{b}} cm. How long is the remaining piece?',
      'wp-meas-sub-2': '{{name1}} had {{a}} metres of fabric. After using {{b}} metres to make a curtain, how much fabric is left?',

      // ── 3-number ───────────────────────────────────────────────────────────
      'wp-add3-1': '{{name1}} collected {{a}} {{item}} on Monday, {{b}} on Wednesday, and {{c}} more on Friday. How many {{item}} did {{name1}} collect in all?',
      'wp-add3-2': 'There are {{a}} {{item}} in the first basket, {{b}} in the second basket, and {{c}} in the third basket. How many {{item}} are there altogether?',
      'wp-add3-3': '{{name1}} has {{a}} {{item}}, {{name2}} has {{b}}, and {{name3}} has {{c}}. How many {{item}} do the three of them have in total?',
      'wp-sub3-1': '{{name1}} started with {{a}} {{item}}. {{name1}} gave {{b}} to {{name2}} and {{c}} to {{name3}}. How many {{item}} does {{name1}} have left?',
      'wp-sub3-2': 'A jar began with {{a}} {{item}}. {{b}} were taken out on Monday and {{c}} more were taken out on Tuesday. How many {{item}} are left in the jar?',
      'wp-sub3-3': '{{name1}} baked {{a}} {{item}}. The family ate {{b}} at breakfast and {{c}} more at dinner. How many {{item}} are left?',
      'wp-mix3-1': '{{name1}} had {{a}} {{item}}, then found {{b}} more, and later gave {{c}} away to a friend. How many {{item}} does {{name1}} have now?',
      'wp-mix3-2': 'There were {{a}} {{item}} in the box. {{name1}} added {{b}} more, but then {{name2}} took {{c}} out. How many {{item}} are left in the box?',

      // ── Story problems (6–7 sentences) ─────────────────────────────────────
      'wp-story-add-1': '{{name1}} had always loved collecting {{item}}. Every weekend, {{name1}} would explore the neighbourhood looking for them. One Saturday morning, {{name1}} found {{a}} beautiful {{item}} near the garden. That afternoon, {{name2}} came to visit and brought {{b}} more {{item}} as a gift. {{name1}} was so excited to add them to the collection. After placing them carefully on the shelf, {{name1}} decided to count them all. How many {{item}} does {{name1}} have in the collection now?',
      'wp-story-add-2': 'The school fair was {{name1}}\'s favourite event of the year. This year, {{name1}} was in charge of the stall selling {{item}}. In the morning, {{name1}} sold {{a}} {{item}} to the younger students. After the lunch break, {{name1}} sold another {{b}} {{item}} to {{name2}} for the class raffle. {{name1}} kept careful track of every sale in a little notebook. When the fair ended, {{name1}} added up all the figures. How many {{item}} did {{name1}} sell at the school fair in total?',
      'wp-story-add-3': 'Every summer, {{name1}} and {{name2}} went on a nature walk together. Their mission was to collect as many {{item}} as they could find. {{name1}} searched along the path and found {{a}} {{item}} hidden among the leaves. Meanwhile, {{name2}} checked near the stream and discovered {{b}} more {{item}}. They met at the picnic bench to compare their finds. Together they put all their {{item}} into one big bag. How many {{item}} did they collect in total?',

      'wp-story-sub-1': '{{name1}} had spent the whole summer collecting {{item}} from around the garden. By the end of August, the jar on the windowsill held {{a}} {{item}}. One afternoon, {{name1}}\'s little sibling came running inside and accidentally knocked the jar off the shelf. {{name1}} rushed to pick them up, but {{b}} of the {{item}} had rolled under the furniture and could not be found. {{name1}} carefully placed the rest back in the jar. Feeling a little sad, {{name1}} counted what was left. How many {{item}} does {{name1}} have now?',
      'wp-story-sub-2': '{{name1}} was very proud of the {{item}} collection that had taken months to build. There were {{a}} {{item}} arranged neatly in a special box. One day, {{name1}} decided to share some with friends from school. {{name2}} asked for {{b}} {{item}} to take home, and {{name1}} happily agreed. It was important to {{name1}} to be generous. After {{name2}} left, {{name1}} sat down and counted what was left in the box. How many {{item}} does {{name1}} have now?',
      'wp-story-sub-3': '{{name1}} worked at the school garden every Tuesday afternoon. The garden had {{a}} {{item}} that the class had been growing all year. One windy day, a storm blew through the town and caused some damage to the garden. When the students came back the next morning, they found that {{b}} of the {{item}} had been blown away or damaged. {{name1}} felt disappointed but was determined to look after what remained. After a quick count, {{name1}} was ready to report to the teacher. How many {{item}} were still in the garden?',

      // ── Decimals ───────────────────────────────────────────────────────────
      'wp-dec-add-1': '{{name1}} bought {{a}} kg of apples and {{b}} kg of pears at the market. How many kilograms of fruit did {{name1}} buy in total?',
      'wp-dec-add-2': 'The first container holds {{a}} litres of water and the second holds {{b}} litres. How many litres of water are there altogether?',
      'wp-dec-sub-1': 'A piece of rope is {{a}} metres long. {{name1}} cuts off {{b}} metres to tie a parcel. How long is the remaining piece of rope?',
      'wp-dec-sub-2': '{{name1}} had {{a}} litres of orange juice. After pouring {{b}} litres into glasses for the guests, how much juice is left?',

      // ── Comparison (> < =) ─────────────────────────────────────────────────
      'wp-cmp-1': '{{name1}} collected {{a}} {{item}} at the park and {{name2}} collected {{b}} {{item}}. Is the number {{name1}} collected greater than, less than, or equal to the number {{name2}} collected? Write > < or = in the answer space.',
      'wp-cmp-2': 'A red jar contains {{a}} {{item}} and a blue jar contains {{b}} {{item}}. Are there more {{item}} in the red jar or the blue jar — or the same amount? Write > < or = to compare the two jars.',
      'wp-cmp-3': 'During the game, {{name1}} scored {{a}} points and {{name2}} scored {{b}} points. Is {{name1}}\'s score greater than, less than, or equal to {{name2}}\'s score? Write > < or = in the answer space.',
      'wp-cmp-hint': 'Write > < or =',
      'wp-cmp-red': 'red',
      'wp-cmp-blue': 'blue'
    }
  },

  se: {
    translation: {
      Maths: 'Matte',
      ABCs: 'Alfabetet',
      difficulty: 'Svårighetsgrad',
      Easy: 'Lätt',
      Medium: 'Mellan',
      Hard: 'Svår',
      Advanced: 'Avancerad',
      uppercase: 'Versaler',
      lowercase: 'Gemener',
      Pages: 'Sidor',
      Problems: 'Uppgifter',
      'Included Operators': 'Inkluderade operatorer',
      'Included Declensions': 'Inkluderade böjningar',
      Name: 'Namn',
      Date: 'Datum',
      Answer: 'Svar',
      Randomize: 'Slumpa',
      Print: 'Skriv ut',
      Zhuyin: 'Bopomofo',
      Words: 'Ord',
      Nouns: 'Substantiv',
      Verbs: 'Verb',
      'Word Problems': 'Textuppgifter',
      'wp-names':
        'Erik|Maja|Lars|Anna|Viktor|Sofia|Johan|Ella|Nils|Astrid|Lena|Karl|Frida|Oskar|Ida|Axel|Linnea|Hugo|Alva|Elias',
      'wp-items':
        'äpplen|kulor|mynt|snäckor|klistermärken|fjädrar|knappar|löv|band|märken|brickor|ädelstenar|frön|ekollon|kritor|blommor|stenar|frimärken|pärlor|kottar|kort|ballonger|böcker|pennor',

      'wp-add-1': '{{name1}} har {{a}} {{item}}. {{name2}} ger {{name1}} {{b}} {{item}} till. Hur många {{item}} har {{name1}} nu?',
      'wp-add-2': 'Det finns {{a}} {{item}} i lådan. {{name1}} lägger i {{b}} {{item}} till. Hur många {{item}} finns det i lådan nu?',
      'wp-add-3': '{{name1}} hittade {{a}} {{item}} och {{name2}} hittade {{b}} {{item}}. Hur många {{item}} hittade de sammanlagt?',
      'wp-add-4': '{{name1}} samlade {{a}} {{item}} på morgonen och {{b}} till på eftermiddagen. Hur många {{item}} samlade {{name1}} totalt?',
      'wp-add-5': 'Det finns {{a}} röda {{item}} och {{b}} blå {{item}} i korgen. Hur många {{item}} finns det i korgen sammanlagt?',
      'wp-add-6': '{{name1}} har {{a}} {{item}} i den blå burken och {{b}} {{item}} i den röda burken. Hur många {{item}} har {{name1}} totalt?',
      'wp-add-7': '{{name1}} plockade {{a}} {{item}} i parken och {{b}} {{item}} på stranden. Hur många {{item}} plockade {{name1}} sammanlagt?',
      'wp-add-8': '{{name1}}s väska har {{a}} {{item}} och {{name2}}s väska har {{b}} {{item}}. Hur många {{item}} har de sammanlagt?',

      'wp-sub-1': '{{name1}} hade {{a}} {{item}}. {{name1}} gav {{b}} {{item}} till {{name2}}. Hur många {{item}} har {{name1}} kvar?',
      'wp-sub-2': 'Det låg {{a}} {{item}} på hyllan. {{b}} av dem föll ner. Hur många {{item}} är kvar på hyllan?',
      'wp-sub-3': '{{name1}} började med {{a}} {{item}} och använde {{b}} av dem. Hur många {{item}} har {{name1}} kvar?',
      'wp-sub-4': 'En burk hade {{a}} {{item}} i sig. {{name1}} tog ut {{b}} {{item}}. Hur många {{item}} finns kvar i burken?',
      'wp-sub-5': '{{name1}} hade {{a}} {{item}}. {{b}} av dem gick sönder. Hur många {{item}} var hela?',
      'wp-sub-6': '{{name1}} har {{a}} {{item}} och {{name2}} har {{b}} {{item}}. Hur många fler {{item}} har {{name1}} än {{name2}}?',
      'wp-sub-7': '{{name1}} vill samla {{a}} {{item}} totalt. Hittills har {{name1}} {{b}} {{item}}. Hur många {{item}} behöver {{name1}} till?',
      'wp-sub-8': '{{name1}} har {{a}} {{item}} och {{name2}} har {{b}} {{item}}. Hur många {{item}} till behöver {{name2}} för att ha lika många som {{name1}}?',

      'wp-money-add-1': '{{name1}} hade {{a}} kronor. {{name2}} gav {{name1}} {{b}} kronor i födelsedagspresent. Hur mycket pengar har {{name1}} nu?',
      'wp-money-add-2': '{{name1}} tjänade {{a}} kronor på att kratta löv och {{b}} kronor på att tvätta bilen. Hur mycket pengar tjänade {{name1}} totalt?',
      'wp-money-add-3': '{{name1}} sparade {{a}} kronor i januari och {{b}} kronor i februari. Hur mycket pengar sparade {{name1}} sammanlagt?',
      'wp-money-sub-1': '{{name1}} hade {{a}} kronor och köpte en bok för {{b}} kronor. Hur mycket pengar har {{name1}} kvar?',
      'wp-money-sub-2': '{{name1}} hade {{a}} kronor. Efter att ha betalat {{b}} kronor för ett nytt spel, hur mycket pengar har {{name1}} kvar?',
      'wp-money-sub-3': 'Skolan samlade in {{a}} kronor till välgörenhet. De spenderade {{b}} kronor på material. Hur mycket pengar är kvar till välgörenheten?',

      'wp-time-add-1': '{{name1}} tillbringade {{a}} minuter med att läsa och {{b}} minuter med att måla. Hur många minuter ägnade {{name1}} åt dessa aktiviteter totalt?',
      'wp-time-add-2': 'Det tog {{a}} minuter att gå till affären och {{b}} minuter att gå hem igen. Hur många minuter tillbringade {{name1}} med att gå sammanlagt?',
      'wp-time-sub-1': 'En film är {{a}} minuter lång. {{name1}} har redan sett {{b}} minuter. Hur många minuter är kvar av filmen?',
      'wp-time-sub-2': '{{name1}} planerade att öva piano i {{a}} minuter. Efter att ha övat {{b}} minuter, hur många minuter återstår?',

      'wp-meas-add-1': '{{name1}} klippte ett snöre som var {{a}} cm långt och ett annat som var {{b}} cm långt. Hur långa är de två snörena tillsammans?',
      'wp-meas-add-2': 'Vägen från {{name1}}s hem till parken är {{a}} meter lång. Från parken till biblioteket är det {{b}} meter. Hur långt är det från hemmet till biblioteket?',
      'wp-meas-sub-1': 'En planka är {{a}} cm lång. {{name1}} sågar av {{b}} cm. Hur lång är den kvarvarande plankan?',
      'wp-meas-sub-2': '{{name1}} hade {{a}} meter tyg. Efter att ha använt {{b}} meter för en gardin, hur mycket tyg är kvar?',

      'wp-add3-1': '{{name1}} samlade {{a}} {{item}} på måndag, {{b}} på onsdag och {{c}} till på fredag. Hur många {{item}} samlade {{name1}} sammanlagt?',
      'wp-add3-2': 'Det finns {{a}} {{item}} i den första korgen, {{b}} i den andra och {{c}} i den tredje. Hur många {{item}} finns det sammanlagt?',
      'wp-add3-3': '{{name1}} har {{a}} {{item}}, {{name2}} har {{b}} och {{name3}} har {{c}}. Hur många {{item}} har de tre sammanlagt?',
      'wp-sub3-1': '{{name1}} hade {{a}} {{item}}. {{name1}} gav {{b}} till {{name2}} och {{c}} till {{name3}}. Hur många {{item}} har {{name1}} kvar?',
      'wp-sub3-2': 'En burk startade med {{a}} {{item}}. {{b}} togs ut på måndag och {{c}} till på tisdag. Hur många {{item}} finns kvar i burken?',
      'wp-sub3-3': '{{name1}} bakade {{a}} {{item}}. Familjen åt {{b}} till frukost och {{c}} till middag. Hur många {{item}} är kvar?',
      'wp-mix3-1': '{{name1}} hade {{a}} {{item}}, hittade {{b}} till och gav sedan {{c}} bort till en vän. Hur många {{item}} har {{name1}} nu?',
      'wp-mix3-2': 'Det fanns {{a}} {{item}} i lådan. {{name1}} lade till {{b}} till, men sedan tog {{name2}} ut {{c}} stycken. Hur många {{item}} är kvar i lådan?',

      'wp-story-add-1': '{{name1}} hade alltid älskat att samla på {{item}}. Varje helg gick {{name1}} runt i kvarteret och letade efter dem. En lördagsmorgon hittade {{name1}} {{a}} vackra {{item}} nära trädgården. På eftermiddagen kom {{name2}} på besök och hade med sig {{b}} {{item}} som gåva. {{name1}} var så exalterad att lägga till dem i samlingen. När {{name1}} hade ställt upp dem noggrant på hyllan räknade {{name1}} dem alla. Hur många {{item}} har {{name1}} i sin samling nu?',
      'wp-story-add-2': 'Skolmässan var {{name1}}s favoritdag på året. I år ansvarade {{name1}} för ett stånd som sålde {{item}}. På förmiddagen sålde {{name1}} {{a}} {{item}} till de yngre eleverna. Efter lunchen sålde {{name1}} ytterligare {{b}} {{item}} till {{name2}} för klasslotteriet. {{name1}} höll noggrant reda på varje försäljning i ett litet häfte. När mässan var slut räknade {{name1}} ihop alla siffrorna. Hur många {{item}} sålde {{name1}} på skolmässan totalt?',
      'wp-story-add-3': 'Varje sommar gick {{name1}} och {{name2}} på en naturpromenad. Deras uppdrag var att samla så många {{item}} de kunde hitta. {{name1}} letade längs stigen och hittade {{a}} {{item}} gömda bland löven. Samtidigt sökte {{name2}} nära bäcken och hittade {{b}} till. De möttes vid picknickbordet för att jämföra sina fynd. Tillsammans lade de alla sina {{item}} i en stor påse. Hur många {{item}} hittade de sammanlagt?',

      'wp-story-sub-1': '{{name1}} hade samlat {{item}} hela sommaren från trädgården. I slutet av augusti innehöll burken på fönsterbrädan {{a}} {{item}}. En eftermiddag kom {{name1}}s lilla syskon inrusande och råkade välta burken från hyllan. {{name1}} skyndade sig att plocka upp dem, men {{b}} av {{item}} hade rullat under möblerna och gick inte att hitta. {{name1}} lade varsamt tillbaka resten i burken. Med ett litet vemodigt hjärta räknade {{name1}} vad som var kvar. Hur många {{item}} har {{name1}} kvar nu?',
      'wp-story-sub-2': '{{name1}} var mycket stolt över sin {{item}}-samling som hade tagit månader att bygga upp. Det fanns {{a}} {{item}} prydligt ordnade i en speciell låda. En dag bestämde sig {{name1}} för att dela med sig till vänner i skolan. {{name2}} bad om att få {{b}} {{item}} att ta med hem, och {{name1}} gick glatt med på det. Det var viktigt för {{name1}} att vara generös. När {{name2}} hade gått satte sig {{name1}} ner och räknade vad som var kvar i lådan. Hur många {{item}} har {{name1}} nu?',
      'wp-story-sub-3': '{{name1}} arbetade i skolträdgården varje tisdag eftermiddag. Trädgården hade {{a}} {{item}} som klassen hade odlat under hela året. En blåsig dag svepte en storm in över staden och orsakade skador i trädgården. När eleverna kom tillbaka nästa morgon fann de att {{b}} av {{item}} hade blåst bort eller skadats. {{name1}} kände sig besviken men var besluten att ta hand om det som återstod. Efter en snabb räkning var {{name1}} redo att rapportera till läraren. Hur många {{item}} fanns kvar i trädgården?',

      'wp-dec-add-1': '{{name1}} köpte {{a}} kg äpplen och {{b}} kg päron på torget. Hur många kilogram frukt köpte {{name1}} totalt?',
      'wp-dec-add-2': 'Den första behållaren innehåller {{a}} liter vatten och den andra innehåller {{b}} liter. Hur många liter finns det sammanlagt?',
      'wp-dec-sub-1': 'Ett rep är {{a}} meter långt. {{name1}} klipper av {{b}} meter för att binda ett paket. Hur långt är det kvarvarande repet?',
      'wp-dec-sub-2': '{{name1}} hade {{a}} liter apelsinjuice. Efter att ha hällt upp {{b}} liter i glas till gästerna, hur mycket juice är kvar?',

      'wp-cmp-1': '{{name1}} samlade {{a}} {{item}} i parken och {{name2}} samlade {{b}} {{item}}. Är det antal {{name1}} samlade större, mindre eller lika med det antal {{name2}} samlade? Skriv > < eller = nedan.',
      'wp-cmp-2': 'En röd burk innehåller {{a}} {{item}} och en blå burk innehåller {{b}} {{item}}. Finns det fler, färre eller lika många {{item}} i den röda burken som i den blå? Skriv > < eller = för att jämföra.',
      'wp-cmp-3': 'Under spelet fick {{name1}} {{a}} poäng och {{name2}} fick {{b}} poäng. Är {{name1}}s poäng större, mindre eller lika med {{name2}}s poäng? Skriv > < eller = nedan.',
      'wp-cmp-hint': 'Skriv > < eller =',
      'wp-cmp-red': 'röd',
      'wp-cmp-blue': 'blå'
    }
  },

  cn: {
    translation: {
      Maths: '數學',
      ABCs: '字母',
      difficulty: '難度',
      Easy: '簡單',
      Medium: '中級',
      Hard: '困難',
      Advanced: '硬核',
      uppercase: '大寫',
      lowercase: '小寫',
      Pages: '頁數',
      Problems: '題數',
      'Included Operators': '運算符號',
      'Included Declensions': '變格',
      Name: '名字',
      Date: '日期',
      Answer: '答案',
      Randomize: '隨機',
      Print: '列印',
      Zhuyin: '注音符號',
      Words: '字',
      Nouns: '名詞',
      Verbs: '動詞',
      'Word Problems': '應用題',
      'wp-names':
        '小明|小紅|小強|小花|小偉|小美|小龍|小雲|大毛|二毛|小剛|小芳|小虎|小燕|小峰|小玲|小杰|小慧|小凱|小雪',
      'wp-items':
        '蘋果|彈珠|硬幣|貝殼|貼紙|羽毛|扣子|葉子|絲帶|徽章|代幣|寶石|種子|橡子|蠟筆|花朵|卵石|郵票|珠子|松果|卡片|氣球|書|鉛筆',

      'wp-add-1': '{{name1}}有{{a}}個{{item}}，{{name2}}又給了{{name1}}{{b}}個{{item}}。{{name1}}現在有多少個{{item}}？',
      'wp-add-2': '盒子裡有{{a}}個{{item}}，{{name1}}又放入{{b}}個{{item}}。盒子裡現在有多少個{{item}}？',
      'wp-add-3': '{{name1}}找到了{{a}}個{{item}}，{{name2}}找到了{{b}}個{{item}}。他們一共找到了多少個{{item}}？',
      'wp-add-4': '{{name1}}早上收集了{{a}}個{{item}}，下午又收集了{{b}}個{{item}}。{{name1}}一共收集了多少個{{item}}？',
      'wp-add-5': '籃子裡有{{a}}個紅色{{item}}和{{b}}個藍色{{item}}。籃子裡一共有多少個{{item}}？',
      'wp-add-6': '{{name1}}的藍色罐子裡有{{a}}個{{item}}，紅色罐子裡有{{b}}個{{item}}。{{name1}}一共有多少個{{item}}？',
      'wp-add-7': '{{name1}}在公園撿了{{a}}個{{item}}，在海灘撿了{{b}}個{{item}}。{{name1}}一共撿了多少個{{item}}？',
      'wp-add-8': '{{name1}}的袋子裡有{{a}}個{{item}}，{{name2}}的袋子裡有{{b}}個{{item}}。他們的{{item}}合起來有多少個？',

      'wp-sub-1': '{{name1}}有{{a}}個{{item}}，給了{{name2}}{{b}}個。{{name1}}還剩多少個{{item}}？',
      'wp-sub-2': '架子上有{{a}}個{{item}}，{{b}}個掉落了。架子上還剩多少個{{item}}？',
      'wp-sub-3': '{{name1}}原來有{{a}}個{{item}}，用了{{b}}個。{{name1}}還剩多少個{{item}}？',
      'wp-sub-4': '罐子裡有{{a}}個{{item}}，{{name1}}取出了{{b}}個。罐子裡還剩多少個{{item}}？',
      'wp-sub-5': '{{name1}}有{{a}}個{{item}}，其中{{b}}個壞了。完好的{{item}}有多少個？',
      'wp-sub-6': '{{name1}}有{{a}}個{{item}}，{{name2}}有{{b}}個{{item}}。{{name1}}比{{name2}}多多少個{{item}}？',
      'wp-sub-7': '{{name1}}想收集{{a}}個{{item}}。現在已有{{b}}個了。還需要多少個{{item}}？',
      'wp-sub-8': '{{name1}}有{{a}}個{{item}}，{{name2}}有{{b}}個{{item}}。{{name2}}還需要多少個{{item}}才能和{{name1}}一樣多？',

      'wp-money-add-1': '{{name1}}有{{a}}元，{{name2}}送給{{name1}}{{b}}元作為生日禮物。{{name1}}現在有多少元？',
      'wp-money-add-2': '{{name1}}耙葉子賺了{{a}}元，洗車賺了{{b}}元。{{name1}}一共賺了多少元？',
      'wp-money-add-3': '{{name1}}一月份存了{{a}}元，二月份又存了{{b}}元。{{name1}}一共存了多少錢？',
      'wp-money-sub-1': '{{name1}}有{{a}}元，在書店花了{{b}}元。{{name1}}還剩多少元？',
      'wp-money-sub-2': '{{name1}}有{{a}}元，買了一個新玩具花了{{b}}元。{{name1}}還剩多少錢？',
      'wp-money-sub-3': '學校為慈善籌得了{{a}}元，購買材料花了{{b}}元。還剩多少元用於慈善？',

      'wp-time-add-1': '{{name1}}花了{{a}}分鐘讀書，{{b}}分鐘畫畫。{{name1}}一共花了多少分鐘在這些活動上？',
      'wp-time-add-2': '從{{name1}}家走到商店需要{{a}}分鐘，走回家需要{{b}}分鐘。{{name1}}一共走了多少分鐘？',
      'wp-time-sub-1': '一部電影長{{a}}分鐘，{{name1}}已經看了{{b}}分鐘。還剩多少分鐘才結束？',
      'wp-time-sub-2': '{{name1}}計劃練琴{{a}}分鐘，已經練了{{b}}分鐘。還需要練多少分鐘？',

      'wp-meas-add-1': '{{name1}}剪了一段{{a}}公分長的繩子和一段{{b}}公分長的繩子。兩段繩子合起來有多長？',
      'wp-meas-add-2': '從{{name1}}家到公園有{{a}}公尺，從公園到圖書館有{{b}}公尺。從家到圖書館有多遠？',
      'wp-meas-sub-1': '一塊木板長{{a}}公分，{{name1}}鋸掉了{{b}}公分。剩下的木板有多長？',
      'wp-meas-sub-2': '{{name1}}有{{a}}公尺的布料，用了{{b}}公尺做窗簾。還剩多少公尺布料？',

      'wp-add3-1': '{{name1}}星期一收集了{{a}}個{{item}}，星期三收集了{{b}}個，星期五又收集了{{c}}個。{{name1}}一共收集了多少個{{item}}？',
      'wp-add3-2': '第一個籃子裡有{{a}}個{{item}}，第二個有{{b}}個，第三個有{{c}}個。三個籃子裡一共有多少個{{item}}？',
      'wp-add3-3': '{{name1}}有{{a}}個{{item}}，{{name2}}有{{b}}個，{{name3}}有{{c}}個。三個人一共有多少個{{item}}？',
      'wp-sub3-1': '{{name1}}有{{a}}個{{item}}，給了{{name2}}{{b}}個，又給了{{name3}}{{c}}個。{{name1}}還剩多少個{{item}}？',
      'wp-sub3-2': '罐子裡起初有{{a}}個{{item}}，週一取出了{{b}}個，週二又取出了{{c}}個。罐子裡還剩多少個{{item}}？',
      'wp-sub3-3': '{{name1}}烤了{{a}}個{{item}}，早餐吃了{{b}}個，晚餐又吃了{{c}}個。還剩多少個{{item}}？',
      'wp-mix3-1': '{{name1}}原有{{a}}個{{item}}，又找到{{b}}個，然後送給朋友{{c}}個。{{name1}}現在有多少個{{item}}？',
      'wp-mix3-2': '箱子裡有{{a}}個{{item}}，{{name1}}放入{{b}}個後，{{name2}}又取出{{c}}個。箱子裡還剩多少個{{item}}？',

      'wp-story-add-1': '{{name1}}一直很喜歡收集{{item}}。每到週末，{{name1}}都會在附近散步尋找{{item}}。某個星期六早上，{{name1}}在花園附近發現了{{a}}個漂亮的{{item}}。那天下午，{{name2}}來拜訪，並帶來了{{b}}個{{item}}作為禮物。{{name1}}興奮地把它們加入自己的收藏。把{{item}}整齊地放在架子上後，{{name1}}決定數一數總數。{{name1}}的收藏現在共有多少個{{item}}？',
      'wp-story-add-2': '學校市集是{{name1}}一年中最期待的活動。今年，{{name1}}負責一個販賣{{item}}的攤位。上午，{{name1}}賣出了{{a}}個{{item}}給低年級的學生。午休後，{{name1}}又賣出了{{b}}個{{item}}給{{name2}}用於班級抽獎。{{name1}}在一個小本子上仔細記錄了每一筆交易。市集結束後，{{name1}}加總了所有的銷售數量。{{name1}}在學校市集上總共賣出了多少個{{item}}？',
      'wp-story-add-3': '每年夏天，{{name1}}和{{name2}}都會一起去郊遊。他們的目標是收集盡可能多的{{item}}。{{name1}}沿著小路搜尋，在落葉中發現了{{a}}個{{item}}。同時，{{name2}}在小溪旁找到了{{b}}個{{item}}。他們在野餐桌旁相聚，比較各自的成果。他們把所有的{{item}}都放入一個大袋子裡。他們一共找到了多少個{{item}}？',

      'wp-story-sub-1': '{{name1}}整個夏天都在花園裡收集{{item}}。八月底，窗台上的罐子裡已裝了{{a}}個{{item}}。某個下午，{{name1}}的小弟弟跑進房間，不小心把罐子從架子上碰翻了。{{name1}}趕緊去撿，但有{{b}}個{{item}}滾到了家具底下再也找不到了。{{name1}}小心翼翼地把剩下的放回罐中。懷著些許失落的心情，{{name1}}數了數剩餘的數量。{{name1}}現在還有多少個{{item}}？',
      'wp-story-sub-2': '{{name1}}非常自豪地擁有這批花費數月才積累的{{item}}收藏。共有{{a}}個{{item}}整齊地陳列在一個特別的盒子裡。有一天，{{name1}}決定分一些給學校的朋友。{{name2}}請求帶走{{b}}個{{item}}，{{name1}}欣然同意。對{{name1}}來說，慷慨分享非常重要。{{name2}}離開後，{{name1}}坐下來數了數盒子裡剩下的數量。{{name1}}現在還有多少個{{item}}？',
      'wp-story-sub-3': '{{name1}}每週二下午都會在學校花園裡工作。花園裡有{{a}}個{{item}}，是全班同學一整年種植的成果。某個有風的日子，一場風暴席捲了小鎮，給花園帶來了損害。第二天早上學生們回來時，發現有{{b}}個{{item}}被吹走或損壞了。{{name1}}感到很失落，但下定決心照顧好剩下的。清點完畢後，{{name1}}準備向老師匯報。花園裡還剩多少個{{item}}？',

      'wp-dec-add-1': '{{name1}}在市場上買了{{a}}公斤的蘋果和{{b}}公斤的梨子。{{name1}}一共買了多少公斤的水果？',
      'wp-dec-add-2': '第一個容器裡有{{a}}公升的水，第二個容器裡有{{b}}公升的水。兩個容器一共有多少公升的水？',
      'wp-dec-sub-1': '一條繩子長{{a}}公尺，{{name1}}剪掉{{b}}公尺用來綁包裹。剩下的繩子有多長？',
      'wp-dec-sub-2': '{{name1}}有{{a}}公升的橙汁，倒了{{b}}公升給客人喝。還剩多少公升橙汁？',

      'wp-cmp-1': '{{name1}}在公園收集了{{a}}個{{item}}，{{name2}}收集了{{b}}個{{item}}。{{name1}}收集的數量是大於、小於還是等於{{name2}}的數量？請在答案欄填入 > < 或 =。',
      'wp-cmp-2': '紅色罐子裡有{{a}}個{{item}}，藍色罐子裡有{{b}}個{{item}}。紅色罐子裡的{{item}}比藍色罐子多、少還是一樣？請填入 > < 或 = 來比較。',
      'wp-cmp-3': '遊戲中，{{name1}}得了{{a}}分，{{name2}}得了{{b}}分。{{name1}}的分數是大於、小於還是等於{{name2}}的分數？請在答案欄填入 > < 或 =。',
      'wp-cmp-hint': '填入 > < 或 =',
      'wp-cmp-red': '紅色',
      'wp-cmp-blue': '藍色'
    }
  }
}
