// This Serves as a template with notes - Please review the Final post on GitHub for FULL requirements

// Vue.js application logic
// Create a new Vue instance.
// Use MUST use el, data, computed, and methods options to support your Vue Application
// Most likely the file to focus on for the Video Presentation

// Review the demo from Week 14

// declaring a component and storing it in the variable gameTrackerComponent
// This component is using the template and props options

const searchHistoryComponent = {
    template: ` <div class="text-light">
                    <div class="row">
                        <h3 class="mx-auto">Search History</h3>

                        <ul v-for="manufacturer in searchHistory">
                            {{ manufacturer.make }} @ {{ manufacturer.time }}
                        </ul>
                    </div>
                </div>`,
    props: ['searchHistory'],
};

const cars = new Vue({
    el: '#cars',
    data: {
        appName: 'NHTSA Vehicle Search App',
        searchName: '',
        filteredResults: [],
        selected: '',
        selectedMake: '',
        fetchResult: {},
        searchHistory: [],
        isSearching: false,
        fetchable: false,
        image: "/logo.png"
    },
    computed: {
        fetchNum: function() {
            return this.searchHistory.length;
        },
        searchResultNum: function() {
            return this.filteredResults.length;
        }
    },
    methods: {
        search: async function () {
            const response = await axios.post(`http://localhost:8888/api/search`, {
                name: this.searchName
            });

            this.isSearching = true;
            this.fetchable = true;

            const manufacturersArray = response.data.Results.map(manufacturer => {
                // console.log(manufacturer)
                const bucket = {};

                bucket["MakeName"] = manufacturer.MakeName;
                bucket["MakeId"] = manufacturer.MakeId;

                return bucket;
            });

            // make function to filter and create new array of objects containing MakeName and MakeID
            function getUnique(arr, comp) {

                // store the comparison  values in array
                const unique =  arr.map(e => e[comp])

                // store the indexes of the unique objects
                .map((e, i, final) => final.indexOf(e) === i && i)

                // eliminate the false indexes & return unique objects
                .filter((e) => arr[e]).map(e => arr[e]);

                return unique;
            }

            this.filteredResults = getUnique(manufacturersArray,'MakeId');
        },
        fetch: async function () {
            const response = await axios.post(`http://localhost:8888/api/fetch`, {
                id: this.selected
            });
            this.fetchResult = response.data;

            this.fetchable = false;

            const makeId = this.selected;
            const manufacturers = this.filteredResults;

            const getMakeName = (id, manufacturers) => {
                for ( let i = 0 ; i < manufacturers.length ; i++ ) {
                    if (id === manufacturers[i].MakeId) {
                        // console.log(manufacturers[i].MakeId);
                        return ( manufacturers[i].MakeName )
                    }
                }
            };
            
            this.selectedMake = getMakeName(makeId, manufacturers);

            const name = this.selectedMake;

            // console.log(name);

            // push search data that we want to add to the history
            this.searchHistory.push({
                make: name,
                // create a new date and time string formatted to local time
                time: new Date().toLocaleString('en-US')
            });

            // console.log(this.searchHistory);

        },
        reload: async function () {
            this.searchName = '';
            this.selected = '';
            this.selectedMake = '';
            this.fetchResult = [];
            this.isSearching = false;
            this.fetchable = false;
        }
    },
    components: {
        // the key (left side) is the the components name
        // the value (right side) is the component itself as declared at the top
        'tracker-component': searchHistoryComponent,
    },
})