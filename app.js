import Chart from 'chart.js';

var app = new Vue({
    el: '#app',
    data: {
      cities: [
        { name: '北京', expanded: false, people: [] },
        { name: '上海', expanded: false, people: [] },
        { name: '广州', expanded: false, people: [] }
      ],
      selectedPerson: null,
      searchKeyword: '',
      cityData: [10, 20, 30],
      educationData: [50, 30, 20],
      jobLevelData: [20, 30, 50],
      cityColors: ['#ff6384', '#36a2eb', '#ffce56'],
      educationColors: ['#4bc0c0', '#36a2eb', '#f7464a'],
      jobLevelColors: ['#4bc0c0', '#36a2eb', '#ffce56'],
      jobLevelLabels: ['初级', '中级', '高级']
    },
    computed: {
      filteredCities: function() {
        var keyword = this.searchKeyword.trim().toLowerCase();
        if (keyword === '') {
          return this.cities;
        } else {
          return this.cities.filter(function(city) {
            return city.name.toLowerCase().indexOf(keyword) !== -1;
          });
        }
      }
    },
    methods: {
      toggleCity: function(city) {
        city.expanded = !city.expanded;
      },
      selectPerson: function(person) {
        this.selectedPerson = person;
      },
      scrollToCity: function(cityName) {
        var el = document.getElementById(cityName);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    mounted: function() {
        var cityChartCtx = document.getElementById('cityChart').getContext('2d');
        var educationChartCtx = document.getElementById('educationChart').getContext('2d');
        var jobLevelChartCtx = document.getElementById('jobLevelChart').getContext('2d');
      
        var cityChart = new Chart(cityChartCtx, {
          type: 'horizontalBar',
          data: {
            labels: ['北京', '上海', '广州'],
            datasets: [{
              data: this.cityData,
              backgroundColor: this.cityColors
            }]
          },
          options: {
            legend: { display: false },
            scales: {
              xAxes: [{
                ticks: { beginAtZero: true }
              }]
            }
          }
        });
      
        var educationChart = new Chart(educationChartCtx, {
          type: 'doughnut',
          data: {
            labels: ['本科', '硕士', '博士'],
            datasets: [{
              data: this.educationData,
              backgroundColor: this.educationColors
            }]
          },
          options: {
            legend: { display: false }
          }
        });
      
        var jobLevelChart = new Chart(jobLevelChartCtx, {
          type: 'pie',
          data: {
            labels: this.jobLevelLabels,
            datasets: [{
              data: this.jobLevelData,
              backgroundColor: this.jobLevelColors
            }]
          },
          options: {
            legend: { display: false }
          }
        });
      }
      
  });