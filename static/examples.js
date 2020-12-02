$(document).ready(function() {

  // the basics
  // ----------

  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  var states = ["Abacavir / dolutegravir / lamivudine","Abatacept","Abilify","Abilify Maintena","Abiraterone","Abraxane","Abreva","Absorica","Acamprosate","Acanya","Acarbose","Accutane","Acetaminophen","Acetaminophen / aspirin / caffeine","Acetaminophen / butalbital / caffeine","Acetaminophen / caffeine / dihydrocodeine","Acetaminophen / chlorpheniramine","Acetaminophen / chlorpheniramine / phenylephrine","Acetaminophen / codeine","Acetaminophen / dexbrompheniramine / pseudoephedrine","Acetaminophen / dichloralphenazone / isometheptene mucate","Acetaminophen / diphenhydramine","Acetaminophen / diphenhydramine / phenylephrine","Acetaminophen / hydrocodone","Acetaminophen / oxycodone","Acetaminophen / propoxyphene","Acetaminophen / tramadol","Acetazolamide","Aciphex","Acitretin","Actemra","Acthar","Actifed","ActoPlus Met","Actonel","Actonel with Calcium","Actos","Acyclovir","Aczone","Adalimumab","Adapalene","Adapalene / benzoyl peroxide","Adderall","Adderall XR","Addyi","Adempas","Adenosine","Adipex-P","Adriamycin","Advair Diskus","Advil","Advil Cold and Sinus","Advil Liqui-Gels","Adzenys XR-ODT","Afinitor","Aflibercept","Afrezza","Afrin","Afrin Original","Aftera","Aggrenox","Alamast","Albiglutide","Albuterol","Albuterol / ipratropium","Alcaftadine","Aldactone","Aldara","Aldomet","Alendronate","Alesse","Aleve","Alfuzosin","Alirocumab","Aliskiren","Allegra","Allegra Allergy","Allegra-D 12 Hour","Allegra-D 24 Hour","Aller-Ease","Alli","Allopurinol","Almotriptan","Alogliptin","Alogliptin / metformin","Alprazolam","Alprostadil","Altabax","Altace","Altavera","Aluminum chloride hexahydrate","Aluminum hydroxide / magnesium trisilicate","Alvesco","Alyacen 1 / 35","Amantadine","Amaryl","Ambien","Ambien CR","Ambrisentan","Amethia","Amethia Lo","Amethyst","Amikacin","Amikin","Amiloride","Amiodarone","Amitiza","Amitriptyline","Amlodipine","Amlodipine / benazepril","Amlodipine / hydrochlorothiazide / olmesartan","Amlodipine / olmesartan","Amlodipine / valsartan","Amnesteem","Amoxicillin","Amoxicillin / clarithromycin / lansoprazole","Amoxicillin / clavulanate","Amoxil","Amphetamine","Amphetamine / dextroamphetamine","Ampyra","Amrix","Anafranil","Analpram-HC","Anaprox","Anaprox-DS","Anastrozole","AndroGel","Androderm","Angeliq","Antabuse","Antivert","Anturol","Anucort-HC","Anusol-HC Suppositories","Apixaban","Aplenzin","Apokyn","Apremilast","Apri","Apriso","Aptiom","Aquavite-E","Aquoral","Arava","Aricept","Arimidex","Aripiprazole","Armodafinil","Armour Thyroid","Aromasin","Artane","Asacol","Asenapine","Ashlyna","Asmanex Twisthaler","Aspirin","Aspirin / butalbital / caffeine","Aspirin / caffeine / orphenadrine","Aspirin / dipyridamole","Aspirin / oxycodone","Astepro","Atacand","Atarax","Atelvia","Atenolol","Ativan","Atomoxetine","Atorvastatin","Atovaquone","Atovaquone / proguanil","Atralin","Atripla","Atropine","Atropine / diphenoxylate","Atropine / hyoscyamine / phenobarbital / scopolamine","Atrovent","Aubagio","Aubra","Augmentin","Augmentin ES-600","Auryxia","Avanafil","Avandamet","Avandia","Avapro","Aveed","Aveeno","Avelox","Aventyl Hydrochloride","Aviane","Avinza","Avodart","Avonex","Axert","Axiron","Aygestin","Ayr Saline Nasal","Azacitidine","Azasan","Azasite","Azathioprine","Azelaic acid","Azelastine","Azelastine / fluticasone","Azilect","Azilsartan medoxomil","Azilsartan medoxomil / chlorthalidone","Azithromycin","Azithromycin Dose Pack","Azo Urinary Pain Relief","Azor","Azulfidine","Azurette","Bacitracin","Bacitracin / neomycin / polymyxin b","Baclofen","Bactrim","Bactrim DS","Bactroban","Balsalazide","Balziva","Barium sulfate","Basaglar","Bayer Aspirin","Beclomethasone","Beconase AQ","Belbuca","Belladonna","Belladonna Tincture","Belsomra","Belviq","Benadryl","Benadryl Allergy","Benazepril","Benicar","Benicar HCT","Benlysta","Bentyl","Benzaclin","Benzamycin","Benzocaine","Benzonatate","Benzoyl peroxide","Benzoyl peroxide / clindamycin","Benzphetamine","Benztropine","Bepotastine","Bepreve","Betadine Aerosol Spray","Betamethasone / calcipotriene","Betapace AF","Bevacizumab","Beyaz","Biaxin","Bicalutamide","Biltricide","Bimatoprost","Bioflavonoids","Biotene Mouthwash","Biotin","Bisacodyl","Bisacodyl / polyethylene glycol 3350 / potassium chloride / sodium bicarbonate / sodium chloride","Bismuth subcitrate potassium / metronidazole / tetracycline","Bismuth subsalicylate","Bisoprolol","Bisoprolol / hydrochlorothiazide","Blisovi 24 Fe","Blisovi Fe 1 / 20","Blisovi Fe 1.5 / 30","Blistex Lip Balm","Bonine","Boniva","Bontril PDM","Bontril Slow Release","Botox","Botox Cosmetic","Botulinum toxin type b","Breo Ellipta","Brexpiprazole","Briellyn","Brilinta","Brimonidine","Brimonidine / timolol","Brinzolamide","Brisdelle","Briviact","Bromfed DM","Bromocriptine","Brompheniramine / dextromethorphan / phenylephrine","Brompheniramine / dextromethorphan / pseudoephedrine","Brompheniramine / pseudoephedrine","BroveX PEB DM","BuSpar","Budeprion XL","Budesonide","Budesonide / formoterol","Bumetanide","Bunavail","Buprenorphine","Buprenorphine / naloxone","Buproban","Bupropion","Bupropion / naltrexone","Buspirone","Butorphanol","Butrans","Bydureon","Byetta","Bystolic","C1 esterase inhibitor (human)","Cabergoline","Cabozantinib","Caffeine","Calan SR","Calcipotriene","Calcitonin","Calcium carbonate","Calcium carbonate / risedronate","Calmoseptine","Cambia","Camila","Camphor / menthol","Campral","Camrese","CamreseLo","Canagliflozin","Candesartan","Capecitabine","Capsaicin","Capsin","Capzasin","Capzasin-HP","Capzasin-P","Carac","Carafate","Carbamazepine","Carbamide peroxide","Carbatrol","Carbidopa / entacapone / levodopa","Carbidopa / levodopa","Cardizem CD","Cardizem LA","Cardura XL","Carfilzomib","Cariprazine","Carisoprodol","Cartia XT","Carvedilol","Casodex","Cataflam","Catapres","Catapres-TTS","Cefazolin","Cefdinir","Cefditoren","Cefixime","Cefprozil","Ceftin","Ceftriaxone","Cefuroxime","Cefzil","Celebrex","Celecoxib","Celexa","Cephalexin","Certolizumab","Cervidil","Cesamet","Cetaphil Lotion","Cetirizine","Cetuximab","Cevimeline","Chantix","Chateal","Cheratussin AC","Cheratussin DAC","Chloral hydrate","Chloramphenicol","Chloraseptic Sore Throat Spray","Chlordiazepoxide","Chlordiazepoxide / clidinium","Chlorhexidine","Chlorpheniramine","Chlorpheniramine / dextromethorphan","Chlorpheniramine / dextromethorphan / phenylephrine","Chlorpheniramine / hydrocodone","Chlorpheniramine / pseudoephedrine","Chlorpromazine","Chlorthalidone","Chlorzoxazone","Cholecalciferol","Cholestyramine","Chondroitin / glucosamine","Chondroitin / glucosamine / methylsulfonylmethane","Chorionic gonadotropin (hcg)","Cialis","Ciclesonide","Ciclopirox","Cilostazol","Cimetidine","Cimzia","Cinacalcet","Cipro","Ciprodex","Ciprofloxacin","Ciprofloxacin / dexamethasone","Citalopram","CitraNatal 90 DHA","Citric acid / magnesium oxide / sodium picosulfate","Claravis","Clarithromycin","Claritin","Claritin-D","Claritin-D 12 Hour","Claritin-D 24 Hour","Cleocin","Climara","Climara Pro","Clindamax","Clindamycin","Clindamycin / tretinoin","Clindesse","Clobazam","Clobetasol","Clobex","Clomid","Clomiphene","Clomipramine","Clonazepam","Clonidine","Clopidogrel","Clorazepate","Clotrimazole","Clozapine","CoQ10","Cobicistat / darunavir","Cobicistat / elvitegravir / emtricitabine / tenofovir","Cobicistat / elvitegravir / emtricitabine / tenofovir alafenamide","Codeine","Codeine / guaifenesin","Codeine / guaifenesin / pseudoephedrine","Codeine / promethazine","Colazal","Colchicine","Colchicine / probenecid","Colcrys","Colesevelam","Collagenase clostridium histolyticum","Colyte","CombiPatch","Combigan","Combivent Respimat","Cometriq","Compazine","Complera","Comtan","Concerta","Condylox","Conjugated estrogens","Conjugated estrogens / medroxyprogesterone","Contrave","Copaxone","Copper","Cordarone","Coreg","Coreg CR","Coricidin HBP Cold & Flu","Coricidin HBP Cough & Cold","Correctol","Cortenema","Corticotropin","Cortisone","Cosamin DS","Cosentyx","Cosopt","Coumadin","Cozaar","Creatine","Creon","Crestor","Crinone","Crisaborole","Cromolyn","Cryselle","Cyclafem 1 / 35","Cyclessa","Cyclizine","Cyclobenzaprine","Cyclopentolate","Cyclophosphamide","Cyclosporine","Cymbalta","Cyproheptadine","Cyred","Cytomel","Dabigatran","Dalfampridine","Daliresp","Dalmane","Danazol","Dapagliflozin","Dapsone","Darifenacin","Darunavir","Darvocet A500","Dasabuvir / ombitasvir / paritaprevir / ritonavir","Dasatinib","Dasetta 1 / 35","Daypro","Daytrana","Debrox","Decadron","Delsym","Delsym 12 Hour Cough Relief","Deltasone","Delzicol","Demerol","Denavir","Denosumab","Depakene","Depakote","Depakote ER","Deplin","Depo-Medrol","Depo-Provera","Depo-Provera Contraceptive","Dermal filler","Desloratadine","Desogen","Desogestrel / ethinyl estradiol","Desonide","Desoximetasone","Desvenlafaxine","Desyrel","Detrol","Detrol LA","Dexamethasone","Dexamethasone / neomycin / polymyxin b","Dexamethasone / tobramycin","Dexchlorpheniramine","Dexedrine","Dexilant","Dexlansoprazole","Dexmethylphenidate","Dextroamphetamine","Dextromethorphan","Dextromethorphan / guaifenesin","Dextromethorphan / guaifenesin / phenylephrine","Dextromethorphan / promethazine","Diamox","Diazepam","Diclegis","Diclofenac","Diclofenac / misoprostol","Dicloxacillin","Dicyclomine","Didrex","Dienogest / estradiol","Diethylpropion","Differin","Diflucan","Diflunisal","Digoxin","Dihydroergotamine","Dilantin","Dilaudid","Dilaudid-HP","Diltiazem","Dimenhydrinate","Dimetapp Children's Cold & Cough","Dimethyl fumarate","Dinoprostone","Diovan","Diovan HCT","Diphenhydramine","Diphenhydramine / naproxen","Diprivan","Disulfiram","Ditropan","Diurex Water Capsules","Divalproex sodium","Divigel","Docetaxel","Docosanol","Doculax","Docusate","Docusate / senna","Dofetilide","Dolobid","Dolutegravir","Donepezil","Dong quai","Doryx","Dorzolamide","Dorzolamide / timolol","Dostinex","Dovonex","Doxazosin","Doxepin","Doxorubicin","Doxy 100","Doxycycline","Doxylamine","Doxylamine / pyridoxine","Dronabinol","Dronedarone","Droperidol","Drospirenone / estradiol","Drospirenone / ethinyl estradiol","Drospirenone / ethinyl estradiol / levomefolate calcium","Drysol","Duac","Duavee","Duexis","Dulaglutide","Dulcolax","Dulcolax Laxative","Dulera","Duloxetine","Dupilumab","Dupixent","Duragesic","Duramorph","Dutasteride","Dutasteride / tamsulosin","Dyanavel XR","Dyazide","Dymista","EContra EZ","Econazole","Edarbi","Edarbyclor","Edex","Efavirenz","Efavirenz / emtricitabine / tenofovir","Effexor","Effexor XR","Effient","Efinaconazole","Eflornithine","Efudex","Egrifta","Elavil","Elbasvir / grazoprevir","Eletriptan","Elidel","Eligard","Elimite","Eliquis","Elmiron","Elocon","Eluxadoline","Embeda","Emetrol","Emla","Emollients","Empagliflozin","Empagliflozin / linagliptin","Emtricitabine / rilpivirine / tenofovir","Emtricitabine / tenofovir","EnLyte","Enablex","Enalapril","Enbrel","Endocet","Enskyce","Enstilar","Entacapone","EnteraGam","Entocort EC","Entresto","Entyvio","Enzalutamide","Epclusa","EpiCeram","Epidrin","Epiduo","Epiduo Forte","Epinephrine","Epitol","Epoetin alfa","Erbitux","Ergocalciferol","Ergotamine","Errin","Erythromycin","Escitalopram","Esgic-Plus","Eslicarbazepine","Esomeprazole","Esomeprazole / naproxen","Estarylla","Estrace","Estrace Vaginal Cream","Estradiol","Estradiol / levonorgestrel","Estradiol / norethindrone","Estradiol Patch","Estring","Eszopiclone","Etanercept","Ethambutol","Ethinyl estradiol / ethynodiol","Ethinyl estradiol / etonogestrel","Ethinyl estradiol / folic acid / levonorgestrel","Ethinyl estradiol / levonorgestrel","Ethinyl estradiol / norelgestromin","Ethinyl estradiol / norethindrone","Ethinyl estradiol / norgestimate","Ethinyl estradiol / norgestrel","Etodolac","Etonogestrel","Eucrisa","Euflexxa","Evamist","Evekeo","Evening Primrose Oil","Everolimus","Evista","Evolocumab","Evoxac","Ex-Lax Maximum Relief Formula","Exalgo","Excedrin","Excedrin PM","Exelon","Exemestane","Exenatide","Exforge","Eylea","Ezetimibe","Ezetimibe / simvastatin","Factive","Falmina","Famciclovir","Famotidine","Famotidine / ibuprofen","Fanapt","Farxiga","Faslodex","Fastin","Febuxostat","Felbamate","Felbatol","Felodipine","Femara","Femring","Fenofibrate","Fenofibric acid","Fentanyl","Fentanyl Transdermal System","Ferrous sulfate","Fesoterodine","Fetzima","Fexmid","Fexofenadine","Fexofenadine / pseudoephedrine","Finacea","Finasteride","Fingolimod","Fioricet","Fiorinal","Firazyr","Flagyl","Flavoxate","Flecainide","Flector Patch","Fleet Bisacodyl","Fleet Enema","Flexeril","Flibanserin","Flomax","Flonase","Flonase Allergy Relief","Flovent","FluMist","FluMist Quadrivalent","Fluconazole","Fludrocortisone","Fluocinolone / hydroquinone / tretinoin","Fluocinonide","Fluoride","Fluorouracil","Fluoxetine","Fluoxetine / olanzapine","Fluphenazine","Fluticasone","Fluticasone / salmeterol","Fluticasone / vilanterol","Fluvoxamine","Fluzone","Focalin","Focalin XR","Folotyn","Foradil Aerolizer","Formoterol","Formoterol / mometasone","Forteo","Fortesta","Fortical","Fosamax","Fosfomycin","Fosrenol","Frova","Frovatriptan","Fulvestrant","Furosemide","Fycompa","Gabapentin","Gabapentin enacarbil","Gabarone","Gabitril","Gablofen","Gadavist","Gadobutrol","Gadopentetate dimeglumine","Gadoxetate disodium","Galantamine","Gardasil","Gas-X","Gatifloxacin","GaviLyte-C","GaviLyte-N","Gelnique","Gemfibrozil","Gemifloxacin","GenTeal","Generess Fe","Genvoya","Geodon","Gianvi","Gildess 1 / 20","Gildess 1.5 / 30","Gildess 24 Fe","Gildess Fe 1 / 20","Gildess Fe 1.5 / 30","Gilenya","Ginseng","Glatiramer","Glatopa","Gleevec","Glimepiride","Glipizide","Glipizide / metformin","Glucophage","Glucotrol","Glutamine","Glyburide","Glyburide / metformin","Glycerin","Glyxambi","GoLYTELY","Golimumab","Goody's Extra-Strength Headache Powders","Goserelin","Gramicidin / neomycin / polymyxin b","Gris-PEG","Griseofulvin","Guaifenesin","Guaifenesin / phenylephrine","Guaifenesin / pseudoephedrine","Guanfacine","Guarana","H.P. Acthar Gel","Hair Regrowth Treatment for Women","Hair, Skin & Nails","Haldol","HalfLytely and Bisacodyl","Halobetasol","Haloperidol","Harvoni","Heather","Hepatitis b adult vaccine","Hiprex","Histrelin","Hizentra","Homatropine / hydrocodone","Horizant","Humalog KwikPen","Human papillomavirus vaccine","Humatin","Humira","Hyalgan","Hyaluronan","Hydralazine","Hydralazine / hydrochlorothiazide / reserpine","Hydrea","Hydrochlorothiazide","Hydrochlorothiazide / lisinopril","Hydrochlorothiazide / losartan","Hydrochlorothiazide / olmesartan","Hydrochlorothiazide / telmisartan","Hydrochlorothiazide / triamterene","Hydrochlorothiazide / valsartan","Hydrocodone","Hydrocodone / ibuprofen","Hydrocortisone","Hydrocortisone / neomycin / polymyxin b","Hydrocortisone / pramoxine","Hydromet","Hydromorphone","Hydroquinone","Hydroxocobalamin","Hydroxyamphetamine / tropicamide","Hydroxychloroquine","Hydroxyprogesterone","Hydroxyurea","Hydroxyzine","Hylan g-f 20","HyoMax SL","Hyoscyamine","Hyoscyamine / methenamine / methylene blue / phenyl salicylate","Hyoscyamine / methenamine / methylene blue / phenyl salicylate / sodium biphosphate","Hypercare","Hysingla ER","Hytrin","Hyzaar","Ibandronate","Ibrance","Ibrutinib","Ibuprofen","Ibuprofen / pseudoephedrine","Icatibant","Iclusig","Icosapent","Ilevro","Iloperidone","Imatinib","Imbruvica","Imdur","Imipramine","Imiquimod","Imitrex","Imitrex Statdose","Immune globulin oral","Immune globulin subcutaneous","Imodium","Imodium A-D","Implanon","Imuran","Inapsine","Incivek","Incruse Ellipta","Inderal","Inderal LA","Indocin","Indomethacin","Infliximab","Influenza virus vaccine, inactivated","Influenza virus vaccine, live, trivalent","Insulin aspart","Insulin degludec","Insulin detemir","Insulin glargine","Insulin inhalation, rapid acting","Insulin lispro","Intal","Interferon alfa-2b","Interferon beta-1a","Intron A","Intuniv","Invega","Invega Sustenna","Invega Trinza","Invokana","Ionamin","Ipratropium","Irbesartan","Iron sucrose","Isoniazid","Isosorbide dinitrate","Isosorbide mononitrate","Isotretinoin","Istodax","Itraconazole","Ivermectin","Ixekizumab","Jakafi","Jalyn","Janumet","Januvia","Jardiance","Jencycla","Jentadueto","Jolessa","Jolivette","Jublia","Juleber","Junel 1 / 20","Junel 1.5 / 30","Junel Fe 1 / 20","Junel Fe 1.5 / 30","Kadian","Kapidex","Kapvay","Kariva","Kazano","Keflex","Kenalog-10","Kenalog-40","Keppra","Keppra XR","Kerydin","Ketamine","Ketoconazole","Ketorolac","Keytruda","Klonopin","Klor-Con","Kombiglyze XR","Kybella","Kyleena","L-methylfolate","LMX 4","Lacosamide","Lactaid","Lactase","Lactobacillus acidophilus","Lactulose","Lamictal","Lamisil","Lamisil AT","Lamotrigine","Lansoprazole","Lanthanum carbonate","Lantus","Lantus Solostar","Lariam","Larin 24 Fe","Larin Fe 1 / 20","Larissia","Lasix","Lastacaft","Latanoprost","Latuda","Leader Nicotine Polacrilex","Ledipasvir / sofosbuvir","Leflunomide","Lenalidomide","Lessina","Letairis","Letrozole","Leuprolide","Levaquin","Levemir","Levetiracetam","Levitra","Levlen","Levocetirizine","Levofloxacin","Levomilnacipran","Levonorgestrel","Levora","Levorphanol","Levothroid","Levothyroxine","Levoxyl","Levsin","Lexapro","Lexiscan","Lialda","Librax","Librium","Lidex","Lidocaine","Lidocaine Viscous","Lidoderm","Lifitegrast","Liletta","Limbrel","Linaclotide","Linagliptin","Linagliptin / metformin","Linzess","Lioresal","Lioresal Intrathecal","Liothyronine","Lipitor","Liraglutide","Lisdexamfetamine","Lisinopril","Lithium","Lithobid","Livalo","Lo / Ovral","Lo / Ovral-28","Lo Loestrin Fe","LoSeasonique","Loestrin 21 1 / 20","Loestrin 21 1.5 / 30","Loestrin 24 Fe","Loestrin Fe 1 / 20","Lomotil","Loperamide","Lopressor","Loratadine","Loratadine / pseudoephedrine","Lorazepam","Lorcaserin","Lorcet 10 / 650","Lortab","Loryna","Lorzone","Losartan","Lotemax","Lotensin","Loteprednol","Lotrel","Lovastatin","Lovaza","Loxapine","Lubiprostone","Lumigan","Lunesta","Lupron","Lupron Depot","Lupron Depot-PED","Lurasidone","Lutera","Luvox","Luvox CR","Lybrel","Lyrica","Lysine","Lysteda","Lyza","M-Zole 3","MCT","MS Contin","MVI Adult","Macrobid","Macrodantin","Magnesium citrate","Magnesium hydroxide","Magnesium oxide","Magnesium sulfate / potassium sulfate / sodium sulfate","Magnevist","Makena","Malarone","Maprotiline","Marinol","Marlissa","Mavik","Maxalt","Maxalt-MLT","Mebendazole","Meclizine","Medium chain triglycerides","Medrol","Medrol Dosepak","Medroxyprogesterone","Mefenamic acid","Mefloquine","Megace","Megace ES","Megestrol","Melatonin","Meloxicam","Melpaque HP","Melquin HP","Memantine","Menactra","Menthol / zinc oxide","Meperidine","Mepivacaine","Mepolizumab","Meprobamate","Mepron","Mercaptopurine","Meridia","Mesalamine","Mestinon","Mestranol / norethindrone","Metadate CD","Metamucil","Metaxalone","Metformin","Metformin / pioglitazone","Metformin / rosiglitazone","Metformin / saxagliptin","Metformin / sitagliptin","Methadone","Methadone Diskets","Methadose","Methamphetamine","Methenamine","Methimazole","Methocarbamol","Methotrexate","Methscopolamine","Methyl salicylate","Methylcellulose","Methylin","Methylin ER","Methylnaltrexone","Methylphenidate","Methylprednisolone","Metoclopramide","Metoprolol","Metoprolol Tartrate","MetroCream","MetroGel","MetroGel-Vaginal","Metronidazole","Mevacor","Mexiletine","Mexitil","Miacalcin","Mibelas 24 Fe","Micardis","Micardis HCT","Miconazole","Microgestin 1 / 20","Microgestin Fe 1 / 20","Microgestin Fe 1.5 / 30","Midamor","Midazolam","Midodrine","Migranal","Milnacipran","Minastrin 24 Fe","Minivelle","Minocycline","Minoxidil","MiraLax","Mirabegron","Mirapex","Mircette","Mirena","Mirtazapine","Mirvaso","Misoprostol","Mobic","Modafinil","Mometasone","Monistat 1-Day or Night Combination Pack","Monistat 3-Day Combination Pack","Monistat 7","Monistat 7-Day Combination Pack","Mono-Linyah","Monodox","Mononessa","Monovisc","Montelukast","Monurol","Morphine","Morphine / naltrexone","Movantik","MoviPrep","Moxifloxacin","Mucinex","Mucinex D","Mucinex D Maximum Strength","Mucinex DM","Mucinex DM Maximum Strength","Mucinex Maximum Strength","Mucomyst","Multaq","Multivitamin","Multivitamin with iron","Multivitamin with minerals","Multivitamin, prenatal","Mumps virus vaccine","Mupirocin","Muse","My Way","Mycelex Troche","Mycophenolate mofetil","Mydayis","Mylanta Gas","Myobloc","Myrbetriq","NP Thyroid","Nabilone","Nabumetone","Nadolol","Nalbuphine","Naloxegol","Naloxone","Naloxone / oxycodone","Naloxone / pentazocine","Naltrexone","Namenda","Namenda XR","Naphazoline","Naphazoline / pheniramine","Naprosyn","Naproxen","Naproxen / sumatriptan","Naratriptan","Nardil","Naropin Polyamp","Nasacort","Nasacort Allergy 24HR","Nasonex","Natalizumab","Natazia","Natroba","Nature-Throid","Nebivolol","Necon 1 / 35","Necon 1 / 50","Necon 7 / 7 / 7","Nefazodone","Neo-Poly-Dex","Nepafenac","Nesina","Neulasta","Neupro","Neurontin","Nevirapine","Nexafed Nasal Decongestant","Nexavar","Nexium","Nexplanon","Next Choice","Niacin","Niacin / simvastatin","Niacinamide","Niaspan","Nicorette","Nicotine","Nicotrol Inhaler","Nicotrol NS","Nifedical XL","Nifedipine","Nikki","Nilotinib","Niraparib","Nisoldipine","Nitro-Dur","Nitrofurantoin","Nitroglycerin","Nivolumab","Nizoral A-D","NoDoz","Nolvadex","Nor-QD","Nora-Be","Norco","Norethindrone","Norflex","Norfloxacin","Norgesic Forte","Noroxin","Nortrel 1 / 35","Nortrel 7 / 7 / 7","Nortriptyline","Norvasc","Norvir","Nostrilla","Novolin 70 / 30","Novolog","NuLYTELY","Nubain","Nucala","Nucynta","Nucynta ER","NuvaRing","Nuvigil","Nystatin","Nystop","Nytol","OB Complete Gold","Oasis Tears","Ocella","Ocular lubricant","Ofloxacin","Ogestrel-28","Olanzapine","Oleptro","Olmesartan","Olodaterol","Olodaterol / tiotropium","Olopatadine","Omalizumab","Omega-3 polyunsaturated fatty acids","Omeprazole","Omeprazole / sodium bicarbonate","Omnaris","Omnicef","OnabotulinumtoxinA","Ondansetron","Onexton","Onfi","Onglyza","Onzetra Xsail","Opana","Opana ER","Opcicon One-Step","Opcon-A","Opdivo","Opium","Oracea","Orap","Orencia","Orlistat","Orphenadrine","Orsythia","Ortho Cyclen","Ortho Evra","Ortho Micronor","Ortho Tri-Cyclen","Ortho Tri-Cyclen Lo","Ortho-Cept","Orthovisc","Oseltamivir","OsmoPrep","Ospemifene","Osphena","Otezla","Oxaliplatin","Oxaprozin","Oxcarbazepine","OxyContin","Oxybutynin","Oxycodone","Oxymetazoline","Oxymorphone","Oxytrol","Paclitaxel protein-bound","Palbociclib","Paliperidone","Pamabrom","Pamelor","Pancrelipase","Panitumumab","Pantoprazole","ParaGard","Parafon Forte DSC","Paremyd","Parlodel","Parnate","Paromomycin","Paroxetine","Pataday","Patanase","Patanol","Paxil","Paxil CR","Pazeo","Pazopanib","Pedipirox-4","Peganone","Pegasys","Pegfilgrastim","Peginterferon alfa-2a","Pembrolizumab","Pemirolast","Penciclovir","Penicillin VK","Penlac Nail Lacquer","Pennsaid","Pentasa","Pentazocine","Pentosan polysulfate sodium","Pentothal","Pepcid","Pepto-Bismol","Perampanel","Percocet","Perindopril","Permethrin","Perphenazine","Phenazopyridine","Phendimetrazine","Phenelzine","Phenergan","Phenobarbital","Phenohytro","Phenol","Phentermine","Phentermine / topiramate","Phenylephrine","Phenylephrine / pramoxine","Phenytoin","Philith","Phillips' Milk of Magnesia","Phosphorated carbohydrate solution","Pimecrolimus","Pimozide","Pimtrea","Pindolol","Pioglitazone","Pirmella 1 / 35","Piroxicam","Pitavastatin","Plan B","Plan B One-Step","Plaquenil","Plavix","Plecanatide","Pletal","Pneumococcal 13-valent vaccine","Pneumococcal 23-polyvalent vaccine","Podofilox","Polidocanol","Polyethylene glycol 3350","Polyethylene glycol 3350 with electrolytes","Polymyxin b / trimethoprim","Polysporin First Aid Antibiotic Ointment","Ponstel","Portia","Potassium chloride","Povidone iodine","Pradaxa","Pralatrexate","Praluent","Pramipexole","Prasugrel","Pravachol","Pravastatin","Praziquantel","Prazosin","Prednisolone","Prednisone","Pregabalin","Premarin","Prempro","Prenatal Plus","Prepopik","Prevacid","Prevacid SoluTab","Previfem","Prevnar 13","Prevpac","Prezcobix","Prezista","Prialt","Prilosec","Primidone","Prinivil","Pristiq","Pro-Den Rx","ProAir HFA","ProAir RespiClick","ProAmatine","Probenecid and Colchicine","Procardia","Procardia XL","Prochlorperazine","Procrit","Proctofoam","Procyclidine","Proferrin-ES","Progesterone","Prograf","Prolia","Prolixin","Promethazine","Promethazine DM","Propafenone","Propecia","Propofol","Propoxyphene","Propranolol","Proscar","Protonix","Protopic","Provera","Provigil","Prozac","Pseudoephedrine","Pseudoephedrine / triprolidine","Psyllium","Pulmicort Flexhaler","Pylera","Pyrantel","Pyridium","Pyridostigmine","QNASL","Qsymia","Quasense","Qudexy XR","Questran","Quetiapine","Quibron-T","Quillivant XR","Quinapril","Quinine","Qutenza","Qvar","Rabeprazole","RadiaPlexRx","Raloxifene","Ramelteon","Ramipril","Ranexa","Ranibizumab","Ranitidine","Ranolazine","Rapaflo","Rasagiline","Readi-Cat 2","Rebetol","Rebif","Reclast","Reclipsen","RectiCare","Rectiv","Reese's Pinworm Medicine","Refresh Liquigel","Regadenoson","Reglan","Regorafenib","Relafen","Relenza","Relistor","Relpax","Remeron","Remeron SolTab","Remicade","Remodulin","Renvela","Repatha","Requip","Requip XL","Restasis","Restoril","Retapamulin","Retin-A","Revatio","Revlimid","Rexulti","Rheumatrex Dose Pack","Rhinocort Aqua","Rho (d) immune globulin","Rhofade","Ribavirin","Riboflavin","Rifampin","Rifaximin","Riociguat","Risedronate","Risperdal","Risperdal Consta","Risperdal M-Tab","Risperidone","Ritalin","Rituxan","Rituximab","Rivaroxaban","Rivastigmine","Rizatriptan","Robaxin","Robaxin-750","Robitussin CoughGels Long-Acting","Rocephin","Roflumilast","Rogaine","Rogaine Men's Extra Strength","Rogaine Women's","Romidepsin","Ropinirole","Ropivacaine","Rosiglitazone","Rosuvastatin","Rotigotine","Rowasa","Roxicet","Rozerem","Rozex","Rytary","Rythmol","Ryzolt","S-adenosylmethionine","SMZ-TMP DS","Sacubitril / valsartan","Safyral","Saliva substitutes","Salofalk","Salonpas Pain Patch","Salsalate","Sanctura","Sandostatin","Saphris","Sarafem","Savaysa","Savella","Saw palmetto","Saxagliptin","Saxenda","Scopolamine","Seasonale","Seasonique","Secukinumab","Selegiline","Selenium sulfide","Selexipag","Selsun Blue","Senna","Senna Lax","Senokot","Septra","Septra DS","Seroquel","Seroquel XR","Sertraline","Sevelamer","Sharobel","Sildenafil","Silenor","Silodosin","Simcor","Simethicone","Simply Sleep","Simponi","Simponi Aria","Simvastatin","Sinemet","Singulair","Sitagliptin","Skelaxin","Sklice","Skyla","Slow Fe","Smoothie Readi-Cat 2","Sodium biphosphate / sodium phosphate","Sodium chloride","Sodium hyaluronate","Sodium oxybate","Sofosbuvir","Sofosbuvir / velpatasvir","Solaraze","Solarcaine Burn Relief","Solifenacin","Solodyn","Soma","Somatropin","Sominex","Somnote","Sonata","Soolantra","Sorafenib","Soriatane","Sotalol","Sovaldi","Spectracef","Spiriva","Spiriva Respimat","Spironolactone","Sporanox","Sprintec","Sprix","Sronyx","St. john's wort","Stadol","Stalevo","Stelara","Stelazine","Stendra","Stiolto Respimat","Stivarga","Strattera","Stribild","Striverdi Respimat","Sublimaze","Suboxone","Succinylcholine","Sucralfate","Sudafed 24-Hour","Sudafed Congestion","Sudafed PE Pressure + Pain","Sudafed PE Severe Cold","Sular","Sulfacetamide sodium / sulfur","Sulfamethoxazole / trimethoprim","Sulfasalazine","Sulfazine","Sulindac","Sumatriptan","Sumavel DosePro","Sunitinib","Supartz","Suprax","Suprep Bowel Prep Kit","Sustiva","Sutent","Suvorexant","Symbicort","Symbyax","Synthroid","Synvisc","Synvisc-One","Systane","Systane Ultra","Taclonex","Tacrolimus","Tadalafil","Tafluprost","Taltz","Talwin","Talwin Nx","Tambocor","Tamiflu","Tamoxifen","Tamsulosin","Tanzeum","Tapentadol","Tarceva","Tarina Fe 1 / 20","Tasigna","Tavaborole","Taxotere","Taytulla","Tazarotene","Tazorac","Tecfidera","Tegretol","Tegretol XR","Tekturna","Telaprevir","Telmisartan","Temazepam","Temodar","Temozolomide","Tenex","Tenuate","Terazol 7","Terazosin","Terbinafine","Terbutaline","Terconazole","Teriflunomide","Teriparatide","Tessalon","Tessalon Perles","Testim","Testopel","Testosterone","Tetracycline","Tetrahydrozoline / zinc sulfate","Tev-Tropin","TheraTears Nutrition","Thiopental","Thorazine","Thyroid desiccated","Tiagabine","Ticagrelor","Tikosyn","Timoptic","Tindamax","Tinidazole","Tioconazole","Tiotropium","Tirosint","Tivicay","Tizanidine","TobraDex","Tocilizumab","Tofacitinib","Tofranil","Tolak","Tolterodine","Topamax","Topical Anesthetic Dental Gel","Topiramate","Toprol-XL","Toradol","Toradol IV / IM","Torsemide","Toujeo","Toujeo Solostar","Toviaz","Tradjenta","Tramadol","Trandolapril","Tranexamic acid","Transderm-Scop","Tranylcypromine","Trazodone","Treprostinil","Tresiba","Tretinoin","Treximet","Trezix","Tri-Estarylla","Tri-Linyah","Tri-Lo-Estarylla","Tri-Lo-Marzia","Tri-Lo-Sprintec","Tri-Luma","Tri-Previfem","Tri-Sprintec","TriCor","TriNessa","TriNessa Lo","Triamcinolone","Triamterene","Tribenzor","Trifluoperazine","Trihexyphenidyl","Trilafon","Trileptal","Trilipix","Trimethobenzamide","Trimethoprim","Trintellix","Triumeq","Trivora","Trolamine salicylate","Tropicamide","Trospium","Trulance","Trulicity","Truvada","Tryptophan","Tums Regular Strength","Tums Smoothies","Tussionex Pennkinetic","Tylenol","Tylenol PM","Tylenol with Codeine #3","Tylenol with Codeine #4","Tysabri","Ubiquinone","Uceris","Ulipristal","Uloric","Ultracet","Ultram","Ultram ER","Ultram ODT","Umeclidinium","Umeclidinium / vilanterol","Unisom SleepGels","Unisom SleepTabs","Unithroid","Uptravi","Uribel","Uricalm","Urispas","Uroxatral","Ustekinumab","VESIcare","Vagifem","Vagistat-1","Valacyclovir","Valium","Valproic acid","Valsartan","Valtrex","Valturna","Vancomycin","Vandazole","Vaniqa","Vanspar","Vantin","Vardenafil","Varenicline","Vascepa","Vasotec","Vedolizumab","Velivet","Velphoro","Veltin","Vemurafenib","Venlafaxine","Venofer","Ventolin","Ventolin HFA","Veramyst","Verapamil","Versed","Vestura","Viagra","Viberzi","Vicks QlearQuil Nighttime Allergy Relief","Vicks Sinex Nasal Spray (old formulation)","Vicodin","Vicodin HP","Vicoprofen","Victoza","Vidaza","Viekira Pak","Vienva","Vigamox","Viibryd","Vilazodone","Vimovo","Vimpat","Viorele","Viramune","Virtussin A / C","Visine Totality Multi-Symptom Relief","Vistaril","Vitafol Ultra","Vitamin B2","Vitamin D3","Vitamin e","Vivelle-Dot","Vivitrol","Voltaren","Voltaren Gel","Vortioxetine","Vospire ER","Votrient","Vraylar","Vytorin","Vyvanse","Warfarin","Welchol","Wellbutrin","Wellbutrin SR","Wellbutrin XL","WinRho SDF","Xanax","Xanax XR","Xarelto","Xeljanz","Xeloda","Xenical","Xerac AC","Xgeva","Xiaflex","Xifaxan","Xiidra","Xolair","Xolegel","Xtampza ER","Xtandi","Xulane","Xylometazoline","Xyrem","Xyzal","Yasmin","Yaz","Yohimbine","Yuvafem","Zaleplon","Zanaflex","Zanamivir","Zantac","Zantac 150","Zarah","Zecuity","Zegerid","Zegerid OTC","Zejula","Zelboraf","Zenatane","Zenzedi","Zepatier","Zestril","Zetia","Ziac","Ziana","Ziconotide","Zileuton","Ziprasidone","Zipsor","Zithromax","Zocor","Zofran","Zofran ODT","Zohydro ER","Zoladex","Zoledronic acid","Zolmitriptan","Zoloft","Zolpidem","Zolpimist","Zometa","Zomig","Zomig-ZMT","Zonegran","Zonisamide","Zorvolex","Zostavax","Zoster vaccine live","Zostrix Diabetic Foot Pain","Zovia","Zovia 1 / 35","Zovirax","Zovirax Cream","Zubsolv","Zyban","Zyclara","Zyprexa","Zyprexa Zydis","Zyrtec","ZzzQuil","depo-subQ provera 104","ella","femhrt"];

  $('#the-basics .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'states',
    source: substringMatcher(states)
  });

  // bloodhound
  // ----------

  // constructs the suggestion engine
  var states = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    // `states` is an array of state names defined in "The Basics"
    local: states
  });

  $('#bloodhound .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'states',
    source: states
  });

  // prefetch
  // --------

  var countries = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    // url points to a json file that contains an array of country names, see
    // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
    prefetch: '../data/countries.json'
  });

  // passing in `null` for the `options` arguments will result in the default
  // options being used
  $('#prefetch .typeahead').typeahead(null, {
    name: 'countries',
    source: countries
  });

  // remote
  // ------

  var bestPictures = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../data/films/post_1960.json',
    remote: {
      url: '../data/films/queries/%QUERY.json',
      wildcard: '%QUERY'
    }
  });

  $('#remote .typeahead').typeahead(null, {
    name: 'best-pictures',
    display: 'value',
    source: bestPictures
  });

  // default suggestions
  // -------------------

  var nflTeams = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function(obj) { return obj.team; },
    prefetch: '../data/nfl.json'
  });

  function nflTeamsWithDefaults(q, sync) {
    if (q === '') {
      sync(nflTeams.get('Detroit Lions', 'Green Bay Packers', 'Chicago Bears'));
    }

    else {
      nflTeams.search(q, sync);
    }
  }

  $('#default-suggestions .typeahead').typeahead({
    minLength: 0,
    highlight: true
  },
  {
    name: 'nfl-teams',
    display: 'team',
    source: nflTeamsWithDefaults
  });

  // custom templates
  // ----------------

  $('#custom-templates .typeahead').typeahead(null, {
    name: 'best-pictures',
    display: 'value',
    source: bestPictures,
    templates: {
      empty: [
        '<div class="empty-message">',
          'unable to find any Best Picture winners that match the current query',
        '</div>'
      ].join('\n'),
      suggestion: Handlebars.compile('<div><strong>{{value}}</strong> – {{year}}</div>')
    }
  });

  // multiple datasets
  // -----------------

  var nbaTeams = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../data/nba.json'
  });

  var nhlTeams = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../data/nhl.json'
  });

  $('#multiple-datasets .typeahead').typeahead({
    highlight: true
  },
  {
    name: 'nba-teams',
    display: 'team',
    source: nbaTeams,
    templates: {
      header: '<h3 class="league-name">NBA Teams</h3>'
    }
  },
  {
    name: 'nhl-teams',
    display: 'team',
    source: nhlTeams,
    templates: {
      header: '<h3 class="league-name">NHL Teams</h3>'
    }
  });

  // scrollable dropdown menu
  // ------------------------

  $('#scrollable-dropdown-menu .typeahead').typeahead(null, {
    name: 'countries',
    limit: 10,
    source: countries
  });

  // rtl
  // ---

  var arabicPhrases = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [
      "الإنجليزية",
      "نعم",
      "لا",
      "مرحبا",
      "أهلا"
    ]
  });

  $('#rtl-support .typeahead').typeahead({
    hint: false
  },
  {
    name: 'arabic-phrases',
    source: arabicPhrases
  });
});
