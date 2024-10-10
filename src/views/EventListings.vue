<template>
  <div>
    <h2 id="senior-community-events">Senior Community Events in Melbourne</h2>

    <div class="export-buttons">
      <button @click="exportToPDF" aria-label="Export events to PDF">Export to PDF</button>
      <button @click="exportToCSV" aria-label="Export events to CSV">Export to CSV</button>
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

      <h3>Upcoming Events</h3>
      <DataTable
        :value="upcomingEvents"
        :paginator="true"
        :rows="8"
        :filters="filters"
        :globalFilterFields="['name', 'date', 'location']"
        :loading="loading"
        responsiveLayout="scroll"
        aria-live="polite"
      >
        <Column field="name" header="Event Name" sortable></Column>
        <Column field="date" header="Date" sortable>
          <template #body="slotProps">
            {{ formatDate(slotProps.data.date) }}
          </template>
        </Column>
        <Column field="location" header="Location" sortable></Column>
      </DataTable>

      <h3>Past Events</h3>
      <DataTable
        :value="pastEvents"
        :paginator="true"
        :rows="8"
        :filters="filters"
        :globalFilterFields="['name', 'date', 'location']"
        :loading="loading"
        responsiveLayout="scroll"
        aria-live="polite"
      >
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
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import db from '../firebase/init.js';

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

    const fetchEvents = () => {
      const q = query(collection(db, 'events'), orderBy('date', 'desc'));

      onSnapshot(q, (querySnapshot) => {
        const currentDate = new Date().toISOString().split('T')[0];

        const upcoming = [];
        const past = [];

        querySnapshot.forEach((doc) => {
          const event = {
            id: doc.id,
            ...doc.data(),
          };

          if (event.date >= currentDate) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });

        upcomingEvents.value = upcoming.reverse(); 
        pastEvents.value = past;
        loading.value = false;
      });
    };

    onMounted(() => {
      fetchEvents();
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
button:focus, 
input:focus, 
textarea:focus, 
a:focus {
  outline: 2px solid #000;
  outline-offset: 2px;
}
</style>
