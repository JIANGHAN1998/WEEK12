<template>
    <div>
      <h2>Senior Community Events in Melbourne</h2>
  
      <div class="export-buttons">
        <button @click="exportToPDF">Export to PDF</button>
        <button @click="exportToCSV">Export to CSV</button>
      </div>
  
      <div id="export-content">
        <div class="search-container">
          <label for="globalSearch" class="sr-only">Search all events</label>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-search" aria-hidden="true"></i>
            </span>
            <InputText
              id="globalSearch"
              v-model="globalFilter"
              placeholder="Search all events..."
              aria-label="Search all events"
            />
          </div>
        </div>
  
        <h3>2024 Future activities</h3>
        <DataTable
          :value="upcomingEvents"
          :paginator="true"
          :rows="8"
          :filters="filters"
          :globalFilterFields="['name', 'date', 'location']"
          :loading="loading"
          responsiveLayout="scroll"
        >
          <template #header>
            <div class="table-header">
              <h3 class="m-0">Upcoming Events</h3>
            </div>
          </template>
  
          <Column field="name" header="Event Name" sortable></Column>
          <Column field="date" header="Date" sortable>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.date) }}
            </template>
          </Column>
          <Column field="location" header="Location" sortable></Column>
        </DataTable>
  
        <h3>2023 Completed activities</h3>
        <DataTable
          :value="pastEvents"
          :paginator="true"
          :rows="8"
          :filters="filters"
          :globalFilterFields="['name', 'date', 'location']"
          :loading="loading"
          responsiveLayout="scroll"
        >
          <template #header>
            <div class="table-header">
              <h3 class="m-0">Past Events</h3>
            </div>
          </template>
  
          <Column field="name" header="Event Name" sortable></Column>
          <Column field="date" header="Date" sortable>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.date) }}
            </template>
          </Column>
          <Column field="location" header="Location" sortable></Column>
        </DataTable>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import InputText from 'primevue/inputtext';
  import html2pdf from 'html2pdf.js'; 
  
  export default {
    name: 'EventListings',
    components: {
      DataTable,
      Column,
      InputText,
    },
    setup() {
      const upcomingEvents = ref([]);
      const pastEvents = ref([]);
      const loading = ref(true);
      const globalFilter = ref('');
  
      const filters = ref({
        global: { value: null, matchMode: 'contains' },
      });
  
      watch(globalFilter, (newValue) => {
        filters.value.global.value = newValue;
      });
  
      const formatDate = (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleDateString('en-US');
      };
  
      onMounted(() => {
        setTimeout(() => {
          upcomingEvents.value = [
            { name: 'Senior Yoga Class', date: '2024-09-02', location: 'CITY' },
            { name: 'Art Workshop', date: '2024-09-18', location: 'DOCKLANDS' },
            { name: 'Tech Seminar', date: '2024-09-17', location: 'SOUTHBANK' },
            { name: 'Walking Group', date: '2024-09-16', location: 'CITY' },
            { name: 'Music Meetup', date: '2024-10-20', location: 'DOCKLANDS' },
            { name: 'Community Gardening', date: '2024-11-25', location: 'CITY' },
            { name: 'Health Seminar', date: '2024-12-24', location: 'SOUTHBANK' },
            { name: 'Senior Book Club', date: '2024-12-30', location: 'CITY' },
          ];
  
          pastEvents.value = [
            { name: 'Cooking Class', date: '2023-01-10', location: 'CITY' },
            { name: 'Photography Meetup', date: '2023-02-15', location: 'DOCKLANDS' },
            { name: 'Fitness Class', date: '2023-03-25', location: 'SOUTHBANK' },
            { name: 'Historical Tour', date: '2023-04-25', location: 'CITY' },
            { name: 'Senior Dance Night', date: '2023-06-17', location: 'DOCKLANDS' },
            { name: 'Meditation Session', date: '2023-07-15', location: 'SOUTHBANK' },
            { name: 'Senior Tech Meetup', date: '2023-12-30', location: 'CITY' },
            { name: 'Health Seminar', date: '2023-11-15', location: 'DOCKLANDS' },
          ];
  
          loading.value = false;
        }, 1000);
      });
  
      const exportToPDF = () => {
        const element = document.getElementById('export-content');
        html2pdf()
          .from(element)
          .set({
            margin: 1,
            filename: 'events.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          })
          .save();
      };
  
      const exportToCSV = () => {
        const data = [...upcomingEvents.value, ...pastEvents.value]; 
  
        const csvRows = [];
        const headers = ['Event Name', 'Date', 'Location'];
        csvRows.push(headers.join(',')); 
  
        data.forEach((event) => {
          const row = [
            `"${event.name.replace(/"/g, '""')}"`,
            `"${formatDate(event.date)}"`,
            `"${event.location.replace(/"/g, '""')}"`,
          ];
          csvRows.push(row.join(','));
        });
  
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'events.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
  
      return {
        upcomingEvents,
        pastEvents,
        loading,
        globalFilter,
        filters,
        formatDate,
        exportToPDF, 
        exportToCSV, 
      };
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    margin-bottom: 1rem;
    max-width: 400px;
  }
  
  .p-inputgroup {
    width: 100%;
  }
  
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .DataTable {
    margin-bottom: 2rem;
  }
  
  .export-buttons {
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  </style>
  