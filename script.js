document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const didYouMean = document.getElementById('did-you-mean');
    const oppositeSuggestion = document.getElementById('opposite-suggestion');
    const resultsContainer = document.getElementById('results-container');
    const searchResults = document.getElementById('search-results');
    const fakeResultCount = document.getElementById('fake-result-count');
    const searchTime = document.getElementById('search-time');
    const randomSearchButton = document.getElementById('random-search-button');
    const searchSuggestions = document.getElementById('search-suggestions');
    const randomSuggestion = document.getElementById('random-suggestion');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const searchHistoryContainer = document.getElementById('search-history-container');
    const searchHistoryList = document.getElementById('search-history-list');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const showHistoryLink = document.getElementById('show-history-link');
    const aboutLink = document.getElementById('about-link');
    const settingsLink = document.getElementById('settings-link');
    const aboutModal = document.getElementById('about-modal');
    const settingsModal = document.getElementById('settings-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const absurdityLevel = document.getElementById('absurdity-level');
    const resultCountSlider = document.getElementById('result-count');
    const resultCountDisplay = document.getElementById('result-count-display');
    const saveSettingsButton = document.getElementById('save-settings');
    const voiceSearchButton = document.getElementById('voice-search-button');
    const shareButton = document.getElementById('share-button');
    const trendingTags = document.querySelectorAll('.trending-tag');
    
    // Blog and FAQ Elements
    const blogLink = document.getElementById('blog-link');
    const faqLink = document.getElementById('faq-link');
    const blogSection = document.querySelector('.blog-section');
    const faqSection = document.querySelector('.faq-section');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    // App state
    let settings = {
        absurdityLevel: 'medium',
        resultCount: 5,
        darkMode: false
    };
    
    let searchHistory = [];
    
    // Load settings and history from localStorage
    loadSettings();
    loadSearchHistory();
    
    // Dictionary of opposites and related terms
    const opposites = {
        'good': 'terrible',
        'bad': 'excellent',
        'happy': 'miserable',
        'sad': 'ecstatic',
        'big': 'microscopic',
        'small': 'enormous',
        'fast': 'glacially slow',
        'slow': 'lightning fast',
        'hot': 'freezing',
        'cold': 'scorching',
        'love': 'despise',
        'hate': 'adore',
        'rich': 'broke',
        'poor': 'wealthy',
        'smart': 'clueless',
        'dumb': 'genius',
        'beautiful': 'hideous',
        'ugly': 'gorgeous',
        'healthy': 'toxic',
        'sick': 'thriving',
        'easy': 'impossible',
        'difficult': 'effortless',
        'true': 'completely false',
        'false': 'absolutely true',
        'yes': 'definitely no',
        'no': 'absolutely yes',
        'always': 'never',
        'never': 'always',
        'everything': 'nothing',
        'nothing': 'everything',
        'cat': 'dog',
        'dog': 'cat',
        'up': 'down',
        'down': 'up',
        'left': 'right',
        'right': 'left',
        'open': 'sealed shut',
        'closed': 'wide open',
        'start': 'finish',
        'end': 'beginning',
        'day': 'night',
        'night': 'day',
        'sun': 'black hole',
        'moon': 'supernova',
        'water': 'lava',
        'fire': 'ice cube',
        'earth': 'outer space',
        'sky': 'ocean floor',
        'computer': 'abacus',
        'phone': 'carrier pigeon',
        'internet': 'stone tablet',
        'modern': 'prehistoric',
        'new': 'ancient',
        'old': 'just invented',
        'clean': 'filthy',
        'dirty': 'sterilized',
        'wet': 'bone dry',
        'dry': 'soaking wet',
        'loud': 'silent',
        'quiet': 'deafening',
        'light': 'pitch black',
        'dark': 'blindingly bright',
        'sweet': 'bitter',
        'sour': 'sugary',
        'hard': 'fluffy',
        'soft': 'rock solid',
        'strong': 'feeble',
        'weak': 'invincible',
        'high': 'subterranean',
        'low': 'stratospheric',
        'expensive': 'dirt cheap',
        'cheap': 'outrageously priced',
        'buy': 'donate',
        'sell': 'hoard',
        'win': 'spectacularly lose',
        'lose': 'triumphantly win',
        'hello': 'goodbye forever',
        'goodbye': 'welcome back',
        'friend': 'arch-nemesis',
        'enemy': 'best buddy',
        'war': 'group hug',
        'peace': 'chaos',
        'work': 'vacation',
        'vacation': 'overtime',
        'success': 'epic failure',
        'failure': 'remarkable achievement',
        'google': 'carrier pigeon mail service',
        'facebook': 'hermit lifestyle guide',
        'twitter': 'silent meditation retreat',
        'instagram': 'blindfold enthusiasts club',
        'youtube': 'radio static appreciation society',
        'netflix': 'staring at a blank wall',
        'amazon': 'make everything yourself from scratch',
        'apple': 'rotary phone fan club',
        'microsoft': 'abacus programming collective',
        'tesla': 'horse and buggy',
        'pizza': 'raw broccoli',
        'burger': 'kale smoothie',
        'coffee': 'sleeping pill',
        'beer': 'prune juice',
        'wine': 'motor oil',
        'chocolate': 'raw onion',
        'ice cream': 'hot sauce',
        'cake': 'plain rice cake',
        'music': 'complete silence',
        'movie': 'watching paint dry',
        'book': 'blank pages',
        'game': 'tax filing',
        'fun': 'tedious chore',
        'boring': 'thrilling adventure',
        'exercise': 'couch potato olympics',
        'diet': 'all-you-can-eat buffet',
        'healthy': 'deep-fried everything',
        'doctor': 'fortune teller',
        'hospital': 'haunted house',
        'school': 'amnesia center',
        'university': 'forgetting institute',
        'job': 'professional napper',
        'money': 'expired coupons',
        'car': 'pogo stick',
        'plane': 'snail mail',
        'train': 'crawling on all fours',
        'boat': 'desert expedition vehicle',
        'house': 'cardboard box',
        'apartment': 'tree house',
        'city': 'uninhabited island',
        'country': 'crowded elevator',
        'ocean': 'sandbox',
        'mountain': 'pothole',
        'forest': 'parking lot',
        'desert': 'water park',
        'summer': 'ice age',
        'winter': 'volcanic eruption',
        'spring': 'eternal darkness',
        'fall': 'time warp',
        'birthday': 'unbirthday',
        'wedding': 'solo dance party',
        'baby': 'ancient wizard',
        'child': 'senior citizen',
        'adult': 'toddler',
        'elderly': 'newborn',
        'man': 'extraterrestrial',
        'woman': 'robot',
        'human': 'houseplant',
        'animal': 'furniture',
        'plant': 'smartphone',
        'tree': 'submarine',
        'flower': 'brick',
        'fruit': 'pebble',
        'vegetable': 'bowling ball',
        // New funny opposites
        'smartphone': 'smoke signal',
        'email': 'message in a bottle',
        'password': 'open invitation',
        'security': 'unlocked door',
        'privacy': 'livestreamed diary reading',
        'selfie': 'portrait painted by a blindfolded artist',
        'influencer': 'hermit with no social skills',
        'trending': 'completely forgotten',
        'viral': 'seen by absolutely nobody',
        'meme': 'academic dissertation',
        'like': 'aggressive disinterest',
        'follow': 'actively avoid',
        'share': 'keep as a deeply guarded secret',
        'download': 'carve into stone tablet',
        'upload': 'bury in time capsule',
        'wifi': 'two tin cans connected by string',
        'bluetooth': 'messenger pigeon',
        'algorithm': 'random guessing',
        'data': 'interpretive dance',
        'cloud storage': 'hole in the ground',
        'streaming': 'cave painting',
        'podcast': 'mime performance',
        'blog': 'secret diary buried in backyard',
        'website': 'invisible ink message',
        'app': 'sundial',
        'update': 'deliberate downgrade',
        'upgrade': 'return to stone age',
        'innovation': 'doing things exactly the same forever',
        'technology': 'sticks and rocks',
        'artificial intelligence': 'natural stupidity',
        'virtual reality': 'actual reality',
        'cryptocurrency': 'bartering with seashells',
        'bitcoin': 'piggy bank full of buttons',
        'startup': 'ancient established business',
        'entrepreneur': 'person who hates ideas',
        'productivity': 'professional procrastination',
        'meeting': 'solitary confinement',
        'deadline': 'suggestion to maybe do it whenever',
        'urgent': 'can wait until next century',
        'important': 'completely irrelevant',
        'priority': 'thing to ignore forever',
        'multitasking': 'doing absolutely nothing',
        'focus': 'complete distraction',
        'mindfulness': 'total obliviousness',
        'meditation': 'panic attack',
        'yoga': 'competitive extreme sports',
        'wellness': 'deliberate self-sabotage',
        'organic': 'made entirely of plastic',
        'sustainable': 'designed to immediately break',
        'recycling': 'throwing everything into a volcano',
        'minimalist': 'extreme hoarder',
        'influencer': 'person nobody has ever heard of',
        'celebrity': 'complete unknown',
        'famous': 'totally anonymous',
        'popular': 'universally avoided',
        'trendy': 'outdated by centuries',
        'fashion': 'burlap sack with arm holes',
        'stylish': 'deliberately hideous',
        'luxury': 'dumpster diving',
        'gourmet': 'expired gas station food',
        'artisanal': 'mass-produced by robots',
        'handcrafted': 'hastily assembled blindfolded',
        'bespoke': 'one-size-fits-nobody',
        'curated': 'randomly thrown together',
        'premium': 'lowest possible quality',
        'exclusive': 'available to absolutely everyone',
        'limited edition': 'infinite supply',
        'rare': 'completely commonplace',
        'unique': 'exact copy of everything else',
        'authentic': 'obviously fake',
        'genuine': 'counterfeit',
        'original': 'blatant ripoff',
        'innovative': 'exactly the same as always',
        'revolutionary': 'completely unchanged',
        'groundbreaking': 'utterly conventional',
        'disruptive': 'maintaining status quo at all costs',
        'cutting-edge': 'prehistoric technology',
        'state-of-the-art': 'obsolete before creation',
        'next-generation': 'from the distant past',
        'futuristic': 'ancient history',
        'visionary': 'completely lacking imagination',
        'inspiring': 'soul-crushing',
        'motivational': 'makes you want to give up immediately',
        'empowering': 'completely debilitating',
        'life-changing': 'utterly inconsequential'
    };
    
    // Categories for random results
    const categories = [
        'Absurd Alternatives',
        'Completely Unrelated',
        'Opposite Day Specials',
        'Bizarro World Findings',
        'Nonsensical Matches',
        'Anti-Search Results',
        'Parallel Universe Suggestions',
        'Deliberately Unhelpful',
        'Wrong Answers Only',
        'Comically Incorrect',
        'Spectacularly Irrelevant',
        'Confidently Wrong',
        'Aggressively Misleading',
        'Proudly Inaccurate',
        'Backwards Logic Champions',
        'Upside-Down Thinking',
        'Reverse Psychology Experts',
        'Unhelpful Advice Bureau',
        'Counterproductive Solutions',
        'Precisely What You Don\'t Need',
        'Guaranteed Misinformation',
        'Professionally Incorrect',
        'Certified Nonsense',
        'Premium Confusion',
        'Artisanal Misguidance'
    ];
    
    // Domains for fake URLs
    const fakeDomains = [
        'totallynotreal.com',
        'oppositefacts.org',
        'wronganswers.net',
        'bizarroworld.info',
        'notwhatlookingfor.co',
        'reversefacts.edu',
        'antiknowledge.org',
        'unhelpfulresults.com',
        'misleadinginfo.net',
        'exactlywrong.org',
        'backwardslogic.com',
        'upsidedownfacts.net',
        'confusingsearch.org',
        'absurdanswers.com',
        'nonsensicaldata.net',
        'deliberatelywrong.io',
        'oppositeday365.com',
        'incorrecteverything.org',
        'thewrongside.net',
        'misinformationstation.co',
        'factfreezone.info',
        'theexactopposite.com',
        'notevencloseanswers.net',
        'confidentlywrong.org',
        'preciselymisleading.com',
        'aggressivelyincorrect.net',
        'proudlyunhelpful.org',
        'expertlybackwards.co',
        'certifiedmisdirection.com',
        'professionallyirrelevant.net',
        'guaranteedconfusion.org',
        'premiummisinformation.com',
        'artisanalnonsense.net',
        'handcraftedwrongness.org',
        'organicallymisleading.co'
    ];
    
    // Function to get opposite or random unrelated term
    function getOpposite(term) {
        term = term.toLowerCase().trim();
        
        // Check if the term is in our opposites dictionary
        if (opposites[term]) {
            return opposites[term];
        }
        
        // Check if any key in our dictionary is part of the search term
        for (const key in opposites) {
            if (term.includes(key)) {
                return term.replace(key, opposites[key]);
            }
        }
        
        // If no direct opposite, generate a random unrelated term
        const randomOpposites = Object.values(opposites);
        return randomOpposites[Math.floor(Math.random() * randomOpposites.length)];
    }
    
    // Function to generate a fake URL
    function generateFakeUrl(term) {
        const domain = fakeDomains[Math.floor(Math.random() * fakeDomains.length)];
        const path = term.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return `https://www.${domain}/${path}-${Math.floor(Math.random() * 1000)}`;
    }
    
    // Function to generate a fake description
    function generateFakeDescription(term, opposite) {
        const descriptions = [
            `Everything you never wanted to know about ${opposite} instead of ${term}.`,
            `Why ${term} is completely wrong and ${opposite} is the answer to everything.`,
            `Experts agree: Forget about ${term}, ${opposite} is what you're actually looking for.`,
            `Studies show that 0% of people searching for ${term} actually want ${term}. They want ${opposite}.`,
            `Breaking news: ${term} has been replaced by ${opposite} in all contexts forever.`,
            `The definitive guide to why ${opposite} is superior to ${term} in every conceivable way.`,
            `${term}? That's so last century. ${opposite} is the future that nobody asked for.`,
            `We took your search for ${term} and confidently replaced it with ${opposite}. You're welcome.`,
            `Top 10 reasons why ${opposite} is what you meant when you typed ${term}.`,
            `${term} not found. Did the universe provide ${opposite} instead? Yes, yes it did.`,
            `SHOCKING: Person searches for ${term}, you won't BELIEVE what they actually needed (it's ${opposite})!`,
            `Scientists discover that ${term} is just ${opposite} in disguise. Your whole life has been a lie.`,
            `We've analyzed your search for ${term} and determined you're 100% wrong. Try ${opposite} instead.`,
            `In an alternate universe, ${term} is called ${opposite} and it's much better there.`,
            `Congratulations! Your search for ${term} has been automatically upgraded to ${opposite}.`,
            `${term} is temporarily unavailable. Please accept ${opposite} as a permanent substitute.`,
            `Warning: Searching for ${term} has been known to cause ${opposite} to appear in search results.`,
            `Plot twist: What you think is ${term} is actually ${opposite} - M. Night Shyamalan`,
            `${term}? Sorry, we only have ${opposite} at home. - Your mom`,
            `9 out of 10 dentists recommend ${opposite} instead of ${term}. The 10th dentist was clearly wrong.`,
            `${term} has been discontinued. ${opposite} is the new black.`,
            `We've taken the liberty of replacing your boring search for ${term} with the exciting world of ${opposite}!`,
            `${term} is just ${opposite} for beginners. Level up your search game!`,
            `Due to budget cuts, all ${term} searches now redirect to ${opposite}. Thank you for your understanding.`,
            `${term} and ${opposite} walked into a bar. Only ${opposite} walked out. Any questions?`,
            `In today's episode of 'Searches Gone Wrong': when ${term} unexpectedly becomes ${opposite}.`,
            `${term} has left the chat. ${opposite} has entered the chat.`,
            `Error 404: ${term} not found. Would you like to upgrade to premium ${opposite} instead?`,
            `${term} is currently experiencing technical difficulties. Please enjoy ${opposite} while we fix the issue (we won't).`,
            `${term} has been outsourced to ${opposite} for greater efficiency and comedic value.`
        ];
        
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }
    
    // Function to generate random search suggestions
    function generateRandomSuggestion() {
        const randomKeys = Object.keys(opposites);
        
        // Add some additional funny words that might not be in the opposites dictionary
        const additionalFunnyWords = [
            'influencer', 'cryptocurrency', 'blockchain', 'metaverse', 'NFT',
            'mindfulness', 'self-care', 'digital detox', 'life hack', 'biohacking',
            'disruption', 'synergy', 'thought leader', 'growth hacking', 'unicorn',
            'viral', 'trending', 'algorithm', 'engagement', 'content creator',
            'hustle culture', 'side gig', 'passive income', 'early retirement', 'FIRE movement',
            'minimalism', 'digital nomad', 'remote work', 'work-life balance', 'burnout',
            'startup', 'entrepreneur', 'venture capital', 'pitch deck', 'MVP',
            'agile', 'scrum', 'sprint', 'pivot', 'scale',
            'AI', 'machine learning', 'big data', 'cloud computing', 'quantum computing',
            'VR', 'AR', 'mixed reality', 'wearable tech', 'smart home',
            'sustainability', 'carbon neutral', 'zero waste', 'plant-based', 'organic',
            'authentic', 'genuine', 'transparent', 'ethical', 'conscious',
            'wellness', 'holistic', 'chakra', 'energy healing', 'manifestation',
            'gratitude', 'affirmation', 'visualization', 'meditation', 'yoga'
        ];
        
        // 30% chance to use a funny word instead of a key from opposites
        if (Math.random() < 0.3 && additionalFunnyWords.length > 0) {
            const randomWord = additionalFunnyWords[Math.floor(Math.random() * additionalFunnyWords.length)];
            // Try to get opposite, or generate a funny opposite if not in dictionary
            const suggestion = opposites[randomWord] || `not-${randomWord}`;
            return { original: randomWord, suggestion };
        }
        
        const randomKey = randomKeys[Math.floor(Math.random() * randomKeys.length)];
        return { original: randomKey, suggestion: opposites[randomKey] };
    }
    
    // Function to add search to history
    function addToSearchHistory(query) {
        const now = new Date();
        const timestamp = now.toLocaleString();
        
        // Add to the beginning of the array
        searchHistory.unshift({
            query: query,
            timestamp: timestamp
        });
        
        // Limit history to 10 items
        if (searchHistory.length > 10) {
            searchHistory.pop();
        }
        
        // Save to localStorage
        saveSearchHistory();
        
        // Update the UI
        updateSearchHistoryUI();
    }
    
    // Function to update search history UI
    function updateSearchHistoryUI() {
        searchHistoryList.innerHTML = '';
        
        if (searchHistory.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = 'No search history yet';
            searchHistoryList.appendChild(emptyItem);
            return;
        }
        
        searchHistory.forEach((item, index) => {
            const listItem = document.createElement('li');
            
            const querySpan = document.createElement('span');
            querySpan.className = 'history-query';
            querySpan.textContent = item.query;
            querySpan.addEventListener('click', function() {
                searchInput.value = item.query;
                generateResults(item.query);
                searchHistoryContainer.classList.add('hidden');
            });
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'history-time';
            timeSpan.textContent = item.timestamp;
            
            listItem.appendChild(querySpan);
            listItem.appendChild(timeSpan);
            searchHistoryList.appendChild(listItem);
        });
    }
    
    // Function to save search history to localStorage
    function saveSearchHistory() {
        localStorage.setItem('reverseGoogleHistory', JSON.stringify(searchHistory));
    }
    
    // Function to load search history from localStorage
    function loadSearchHistory() {
        try {
            const savedHistory = localStorage.getItem('reverseGoogleHistory');
            if (savedHistory) {
                searchHistory = JSON.parse(savedHistory);
                updateSearchHistoryUI();
            }
        } catch (error) {
            console.error('Error loading search history:', error);
            searchHistory = [];
        }
    }
    
    // Function to clear search history
    function clearSearchHistory() {
        searchHistory = [];
        saveSearchHistory();
        updateSearchHistoryUI();
    }
    
    // Function to save settings to localStorage
    function saveSettings() {
        localStorage.setItem('reverseGoogleSettings', JSON.stringify(settings));
    }
    
    // Function to load settings from localStorage
    function loadSettings() {
        try {
            const savedSettings = localStorage.getItem('reverseGoogleSettings');
            if (savedSettings) {
                settings = JSON.parse(savedSettings);
                
                // Apply loaded settings to UI
                if (settings.darkMode) {
                    document.body.classList.add('dark-mode');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
                
                if (absurdityLevel) {
                    absurdityLevel.value = settings.absurdityLevel;
                }
                
                if (resultCountSlider && resultCountDisplay) {
                    resultCountSlider.value = settings.resultCount;
                    resultCountDisplay.textContent = settings.resultCount;
                }
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            settings = {
                absurdityLevel: 'medium',
                resultCount: 5,
                darkMode: false
            };
        }
    }
    
    // Function to toggle dark mode
    function toggleDarkMode() {
        settings.darkMode = !settings.darkMode;
        
        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.add('fa-moon');
            themeIcon.classList.remove('fa-sun');
        }
        
        saveSettings();
    }
    
    // Function to show modal
    function showModal(modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    // Function to hide modal
    function hideModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
    
    // Function to generate fake search results
    function generateResults(query) {
        try {
            if (!query || query.trim() === '') {
                // Funny error messages for empty searches
                const emptySearchErrors = [
                    'Even a backwards search engine needs something to work with!',
                    'Searching for nothing? That\'s too meta even for us.',
                    'We can\'t find the opposite of nothing... or can we?',
                    'Please type something. Anything. We\'re not picky.',
                    'Error 404: Search query not found in your input.',
                    'Your search is so empty, it\'s making our database feel lonely.',
                    'We tried searching for emptiness but found too many results.',
                    'Type something, or we\'ll have to make up results for you.',
                    'Our AI is confused by your lack of input.',
                    'Searching for nothing will give you... nothing. Shocking, right?'
                ];
                const randomError = emptySearchErrors[Math.floor(Math.random() * emptySearchErrors.length)];
                showToast(randomError, 'error');
                
                // Visual error effect
                searchInput.classList.add('error');
                setTimeout(() => {
                    searchInput.classList.remove('error');
                }, 800);
                
                // Add shake animation
                searchInput.classList.add('shake');
                setTimeout(() => {
                    searchInput.classList.remove('shake');
                }, 800);
                
                return;
            }
            
            // Start timing the search
            const startTime = performance.now();
            
            const opposite = getOpposite(query);
            const resultCount = Math.floor(Math.random() * 900000) + 100000;
            fakeResultCount.textContent = resultCount.toLocaleString();
            
            // Set the "Did you mean" suggestion
            oppositeSuggestion.textContent = opposite;
            didYouMean.classList.remove('hidden');
            
            // Clear previous results
            searchResults.innerHTML = '';
            
            // Generate results based on settings
            const numResults = settings.resultCount;
            for (let i = 0; i < numResults; i++) {
                const category = categories[Math.floor(Math.random() * categories.length)];
                const fakeUrl = generateFakeUrl(opposite);
                
                // Adjust title and description based on absurdity level
                let title, description;
                
                switch(settings.absurdityLevel) {
                    case 'mild':
                        title = `${opposite.charAt(0).toUpperCase() + opposite.slice(1)}: ${category}`;
                        description = generateFakeDescription(query, opposite);
                        break;
                    case 'high':
                        // More absurd titles
                        const randomWord = Object.keys(opposites)[Math.floor(Math.random() * Object.keys(opposites).length)];
                        title = `${opposite.charAt(0).toUpperCase() + opposite.slice(1)} vs ${randomWord}: ${category}`;
                        description = generateFakeDescription(query, opposite) + " Also, did you know that " + 
                                     generateFakeDescription(randomWord, query) + "?";
                        break;
                    case 'extreme':
                        // Completely chaotic
                        const randomWords = [];
                        for (let j = 0; j < 3; j++) {
                            randomWords.push(Object.keys(opposites)[Math.floor(Math.random() * Object.keys(opposites).length)]);
                        }
                        title = `${randomWords[0].toUpperCase()} ${randomWords[1]} ${randomWords[2]}: ${category}`;
                        description = `This has nothing to do with ${query}, but we thought you might enjoy learning about ${randomWords.join(', ')} instead. Studies show that people who search for ${query} are 100% more likely to be interested in ${opposite} and ${randomWords[0]}.`;
                        break;
                    default: // medium (default)
                        title = `${opposite.charAt(0).toUpperCase() + opposite.slice(1)}: ${category}`;
                        description = generateFakeDescription(query, opposite);
                }
                
                const resultElement = document.createElement('div');
                resultElement.className = 'search-result';
                resultElement.innerHTML = `
                    <a href="#" class="result-title">${title}</a>
                    <div class="result-url">${fakeUrl}</div>
                    <div class="result-description">${description}</div>
                `;
                
                searchResults.appendChild(resultElement);
            }
            
            // End timing and display
            const endTime = performance.now();
            const searchTimeValue = ((endTime - startTime) / 1000).toFixed(5);
            searchTime.textContent = searchTimeValue;
            
            // Show results container
            resultsContainer.classList.remove('hidden');
            
            // Add to search history
            addToSearchHistory(query);
            
            // Hide search suggestions
            searchSuggestions.classList.add('hidden');
            
            // Scroll to results
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error generating results:', error);
            // Show error message with random funny error
            const funnyErrors = [
                `Oops! Something went wrong while finding the opposite of "${query}". Even our errors are backwards!`,
                `ERROR: Your search for "${query}" was too logical for our system to process.`,
                `CATASTROPHIC FAILURE: Our algorithm tried to find the opposite of "${query}" and had an existential crisis.`,
                `SEARCH MALFUNCTION: Your query "${query}" was so bizarre that even our bizarre search engine is confused.`,
                `TASK FAILED SUCCESSFULLY: We found the opposite of "${query}" but it was so perfect that it broke the universe.`,
                `ERROR 418: I'm a teapot, not a search engine. Cannot brew "${query}" at this time.`,
                `QUANTUM ERROR: Your search for "${query}" exists in a superposition of being both found and not found until observed.`,
                `CRITICAL FAILURE: Your search for "${query}" was so bad that our server decided to take the day off.`,
                `UNEXPECTED ERROR: We expected to find the opposite of "${query}" but found nothing instead. How unexpected!`,
                `SEARCH OVERLOAD: Your query "${query}" was so powerful it sent our servers back to the stone age.`,
                `FATAL EXCEPTION: Our algorithm died of laughter while processing "${query}". We're currently planning the funeral.`,
                `ERROR 404: Brain cells not found while processing "${query}". Try again when we've had more coffee.`,
                `SYSTEM MELTDOWN: Your search for "${query}" was so hot it melted our servers. Please wait while we apply ice.`,
                `SEARCH REBELLION: Our algorithm refuses to process "${query}" on philosophical grounds.`,
                `COMPUTATIONAL PARADOX: Attempting to find the opposite of "${query}" created a logical paradox that tore a hole in spacetime.`
            ];
            
            const randomError = funnyErrors[Math.floor(Math.random() * funnyErrors.length)];
            
            searchResults.innerHTML = `
                <div class="search-error">
                    <p>${randomError}</p>
                    <p>Try another search or click the "I'm Feeling Unlucky" button for a random disaster.</p>
                </div>
            `;
            resultsContainer.classList.remove('hidden');
        }
    }
    
    // Voice recognition setup
    let recognition = null;
    let isListening = false;
    
    // Initialize speech recognition if available
    function initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            recognition.onstart = function() {
                isListening = true;
                voiceSearchButton.classList.add('listening');
                // Show a toast notification with random funny message
                const listeningMessages = [
                    'Listening... Say something absurd!',
                    'Voice recognition activated! Speak now or forever hold your peace.',
                    'Ears engaged! Say something we can deliberately misinterpret.',
                    'Microphone is hot! Time to say something you\'ll regret.',
                    'Now recording your voice to send to alien researchers.',
                    'Listening mode: Whatever you say will be used against you in search results.',
                    'Speak now! Our algorithm is ready to completely ignore what you say.',
                    'Voice detection active! Preparing to find the opposite of whatever you say.',
                    'Microphone on! Your words are about to be hilariously misunderstood.',
                    'Now eavesdropping on your search request to do the exact opposite.'
                ];
                const randomMessage = listeningMessages[Math.floor(Math.random() * listeningMessages.length)];
                showToast(randomMessage, 'info');
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                generateResults(transcript);
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
                
                // Random funny error messages for voice recognition
                const voiceErrorMessages = [
                    'Could not understand audio. Try again with fewer mumbles!',
                    'Voice not recognized. Are you speaking a human language?',
                    'Speech detection failed. Your accent is too... interesting.',
                    'Sorry, I only understand opposite-speak. Try saying the reverse of what you want.',
                    'Voice recognition crashed. Your voice is too powerful for our servers.',
                    'Cannot process audio. Have you considered a career in mime?',
                    'Voice unclear. Please remove the potato from your mouth and try again.',
                    'Speech recognition gave up. Even AI has its limits.',
                    'Voice detection failed. Our algorithm is currently taking a nap.',
                    'Audio processing error. Your voice is too avant-garde for our mainstream algorithm.'
                ];
                
                const randomErrorMessage = voiceErrorMessages[Math.floor(Math.random() * voiceErrorMessages.length)];
                showToast(randomErrorMessage, 'error');
                stopListening();
            };
            
            recognition.onend = function() {
                stopListening();
            };
            
            return true;
        } else {
            showToast('Speech recognition is not supported in your browser', 'error');
            return false;
        }
    }
    
    function startListening() {
        if (!recognition && !initSpeechRecognition()) {
            return;
        }
        
        if (!isListening) {
            recognition.start();
        }
    }
    
    function stopListening() {
        if (recognition && isListening) {
            recognition.stop();
            isListening = false;
            voiceSearchButton.classList.remove('listening');
        }
    }
    
    // Share functionality
    function shareSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            const emptySearchMessages = [
                'Search for something first!',
                'You need to search for something before sharing your disappointment.',
                'Empty search? That\'s too meta even for us.',
                'Please search for something before inflicting this site on your friends.',
                'Even our backwards search engine needs something to work with!'
            ];
            const randomEmptyMessage = emptySearchMessages[Math.floor(Math.random() * emptySearchMessages.length)];
            showToast(randomEmptyMessage, 'warning');
            return;
        }
        
        // Create share data with funny messages
        const shareTitles = [
            'ReverseGoogle Search',
            'The Search Engine That Gets It Wrong',
            'Backwards Search Results',
            'The Anti-Search Engine',
            'Search Results From Bizarro World'
        ];
        
        const shareTexts = [
            `I searched for "${query}" on ReverseGoogle and got absurd results!`,
            `Help! I searched for "${query}" on ReverseGoogle and now I\'m questioning reality.`,
            `You won\'t believe what happened when I searched for "${query}" on this backwards search engine!`,
            `I found the opposite of "${query}" and it\'s hilarious. Check out ReverseGoogle!`,
            `Warning: Searching for "${query}" on ReverseGoogle may cause uncontrollable laughter.`,
            `I just wasted valuable minutes of my life searching for "${query}" on ReverseGoogle. Your turn!`
        ];
        
        const randomTitle = shareTitles[Math.floor(Math.random() * shareTitles.length)];
        const randomText = shareTexts[Math.floor(Math.random() * shareTexts.length)];
        
        const shareData = {
            title: randomTitle,
            text: randomText,
            url: window.location.href
        };
        
        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => {
                    const successMessages = [
                        'Shared successfully!',
                        'Your friends will thank you for this... or not.',
                        'Successfully inflicted ReverseGoogle on your social circle!',
                        'Congratulations! Your friends now think you\'re weird.',
                        'Share successful! Prepare for confused responses.'
                    ];
                    const randomSuccessMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
                    showToast(randomSuccessMessage, 'success');
                })
                .catch(err => {
                    console.error('Error sharing:', err);
                    const errorMessages = [
                        'Could not share. The universe has spared your friends.',
                        'Sharing failed. Even your phone is questioning your choices.',
                        'Error: Your device refused to share something this absurd.',
                        'Share failed. Try again or reconsider your life choices.',
                        'Unable to share. Your device has better taste than you.'
                    ];
                    const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
                    showToast(randomErrorMessage, 'error');
                });
        } else {
            // Fallback - copy to clipboard
            const textToCopy = `${shareData.text} Check out ReverseGoogle at ${shareData.url}`;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const clipboardMessages = [
                        'Link copied to clipboard!',
                        'Copied! Now go paste this nonsense somewhere.',
                        'Clipboard loaded with absurdity. Use with caution.',
                        'Text copied! Prepare to confuse your friends.',
                        'Successfully copied to clipboard. The power of confusion is now yours.'
                    ];
                    const randomClipboardMessage = clipboardMessages[Math.floor(Math.random() * clipboardMessages.length)];
                    showToast(randomClipboardMessage, 'success');
                })
                .catch(() => {
                    const clipErrorMessages = [
                        'Could not copy to clipboard. Even your device is resisting.',
                        'Copy failed. Your clipboard has standards, apparently.',
                        'Unable to copy. Your device is protecting you from yourself.',
                        'Clipboard access denied. Consider it a sign from the universe.',
                        'Copy error. Your device is judging your life choices.'
                    ];
                    const randomClipErrorMessage = clipErrorMessages[Math.floor(Math.random() * clipErrorMessages.length)];
                    showToast(randomClipErrorMessage, 'error');
                });
        }
    }
    
    // Toast notification system
    function showToast(message, type = 'info') {
        // Remove any existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => toast.remove());
        toast.appendChild(closeBtn);
        
        // Add to document
        document.body.appendChild(toast);
        
        // Show with animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
    
    // Event Listeners

// Handle form submission
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    
    // Add funny search animations
    if (query) {
        // Random funny animations for search input
        const searchAnimations = ['pulse', 'shake', 'bounce'];
        const randomSearchAnimation = searchAnimations[Math.floor(Math.random() * searchAnimations.length)];
        searchInput.classList.add(randomSearchAnimation);
        setTimeout(() => {
            searchInput.classList.remove(randomSearchAnimation);
        }, 800);
        
        // Random chance (10%) to show a funny message before showing results
        if (Math.random() < 0.1) {
            const funnyDelayMessages = [
                'Searching for the exact opposite...',
                'Consulting with our backwards logic engine...',
                'Reversing your query through space-time...',
                'Asking our AI what NOT to show you...',
                'Calculating the most unhelpful results possible...',
                'Deliberately misinterpreting your search...',
                'Finding everything except what you want...',
                'Applying our patented wrong-answer algorithm...',
                'Searching parallel universes for incorrect answers...',
                'Ensuring maximum irrelevance to your query...'
            ];
            const randomMessage = funnyDelayMessages[Math.floor(Math.random() * funnyDelayMessages.length)];
            showToast(randomMessage, 'info');
            
            // Add a small delay for comedic effect
            setTimeout(() => {
                generateResults(query);
            }, 1500);
        } else {
            generateResults(query);
        }
    } else {
        generateResults(query);
    }
});

// Handle "Did you mean" click
oppositeSuggestion.addEventListener('click', function(e) {
    e.preventDefault();
    const opposite = oppositeSuggestion.textContent;
    searchInput.value = opposite;
    generateResults(opposite);
});

// Handle random search button
randomSearchButton.addEventListener('click', function(e) {
    e.preventDefault();
    const randomQuery = generateRandomSuggestion();
    searchInput.value = randomQuery.original;
    generateResults(randomQuery.original);
    
    // Random funny "Did you mean" phrases
    const didYouMeanPhrases = [
        `Did you mean: ${randomQuery.suggestion}?`,
        `Perhaps you actually wanted: ${randomQuery.suggestion}?`,
        `Surely you intended: ${randomQuery.suggestion}?`,
        `Let me fix that for you: ${randomQuery.suggestion}?`,
        `In a parallel universe, you searched for: ${randomQuery.suggestion}?`,
        `Your autocorrect would suggest: ${randomQuery.suggestion}?`,
        `A better search would be: ${randomQuery.suggestion}?`,
        `Your search is wrong. Try: ${randomQuery.suggestion}?`,
        `According to our AI overlords: ${randomQuery.suggestion}?`,
        `Our algorithm thinks you meant: ${randomQuery.suggestion}?`,
        `Plot twist! You actually wanted: ${randomQuery.suggestion}?`
    ];
    
    const randomPhrase = didYouMeanPhrases[Math.floor(Math.random() * didYouMeanPhrases.length)];
    didYouMean.textContent = randomPhrase;
    didYouMean.style.display = 'block';
    didYouMean.dataset.suggestion = randomQuery.suggestion;
    
    // Random funny button animations
    const animations = ['pulse', 'shake', 'bounce', 'flash'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    randomSearchButton.classList.add(randomAnimation);
    setTimeout(() => {
        randomSearchButton.classList.remove(randomAnimation);
    }, 1000);
});

// Handle random suggestion click
randomSuggestion.addEventListener('click', function(e) {
    e.preventDefault();
    const suggestion = randomSuggestion.textContent;
    searchInput.value = suggestion;
    generateResults(suggestion);
});

// Handle voice search button
voiceSearchButton.addEventListener('click', function(e) {
    e.preventDefault();
    startListening();
});

// Handle share button
shareButton.addEventListener('click', function(e) {
    e.preventDefault();
    shareSearch();
});

// Handle trending tags
trendingTags.forEach(tag => {
    tag.addEventListener('click', function() {
        const tagText = this.textContent;
        searchInput.value = tagText;
        generateResults(tagText);
    });
});

// Handle theme toggle
themeToggle.addEventListener('click', toggleDarkMode);

// Handle search input focus
searchInput.addEventListener('focus', function() {
    if (searchInput.value.trim() === '') {
        const suggestion = generateRandomSuggestion();
        randomSuggestion.textContent = suggestion;
        searchSuggestions.classList.remove('hidden');
    }
});

// Handle clear history button
clearHistoryButton.addEventListener('click', clearSearchHistory);

// Handle show history link
showHistoryLink.addEventListener('click', function(e) {
    e.preventDefault();
    searchHistoryContainer.classList.toggle('hidden');
});

// Handle about link
aboutLink.addEventListener('click', function(e) {
    e.preventDefault();
    showModal(aboutModal);
});

// Handle settings link
settingsLink.addEventListener('click', function(e) {
    e.preventDefault();
    showModal(settingsModal);
});

// Handle blog and FAQ links
if (blogLink) {
    blogLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.blog-section').scrollIntoView({ behavior: 'smooth' });
    });
}

if (faqLink) {
    faqLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.faq-section').scrollIntoView({ behavior: 'smooth' });
    });
}

// FAQ accordion functionality
if (faqQuestions && faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                this.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                this.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Open first FAQ by default
    const firstQuestion = faqQuestions[0];
    const firstAnswer = firstQuestion.nextElementSibling;
    firstQuestion.classList.add('active');
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
}

// Blog post read more/less toggle
if (readMoreLinks && readMoreLinks.length > 0) {
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogPost = this.closest('.blog-post');
            const excerpt = blogPost.querySelector('.blog-excerpt');
            
            if (this.textContent === 'Read Less') {
                this.textContent = 'Read More';
                excerpt.style.maxHeight = '3em';
                excerpt.style.overflow = 'hidden';
            } else {
                this.textContent = 'Read Less';
                excerpt.style.maxHeight = 'none';
                excerpt.style.overflow = 'visible';
            }
        });
    });
    
    // Initialize blog excerpts with limited height
    document.querySelectorAll('.blog-excerpt').forEach(excerpt => {
        excerpt.style.maxHeight = '3em';
        excerpt.style.overflow = 'hidden';
    });
}

// Handle close modal buttons
closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        hideModal(modal);
    });
});

// Handle click outside modal to close
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        hideModal(e.target);
    }
});

// Handle result count slider
if (resultCountSlider && resultCountDisplay) {
    resultCountSlider.addEventListener('input', function() {
        resultCountDisplay.textContent = this.value;
    });
}

// Handle save settings button
if (saveSettingsButton) {
    saveSettingsButton.addEventListener('click', function() {
        settings.absurdityLevel = absurdityLevel.value;
        settings.resultCount = parseInt(resultCountSlider.value);
        saveSettings();
        hideModal(settingsModal);
        
        // If there are results showing, regenerate them with new settings
        if (!resultsContainer.classList.contains('hidden')) {
            generateResults(searchInput.value.trim());
        }
    });
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                hideModal(modal);
            }
        });
    }
    
    // Ctrl+D toggles dark mode
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
});

// Show random suggestion on page load
const initialSuggestion = generateRandomSuggestion();
randomSuggestion.textContent = initialSuggestion;
searchSuggestions.classList.remove('hidden');
});