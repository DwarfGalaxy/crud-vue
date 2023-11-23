<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useDataStore } from "./store";
import { headers } from "./util";

// ========fetching data from api============
const blogStore = useDataStore();
onMounted(() => {
  blogStore.fetchData();
});
const blogData = computed(() => blogStore.data);
// ============================================

// =============delete Blog====================
async function deleteBlog(id) {
  blogStore.data = blogStore.data.filter((currBlog) => {
    return currBlog.id != id;
  });
  if (!window.confirm("Are you sure")) {
    return;
  }
  await blogStore.deleteSingleData(id);
}
// ============================================

// ==============update blog==================
const updateItem = reactive({
  title: "",
  author: "",
});
function editItem(item) {
  updateItem.title = item.title;
  updateItem.author = item.author;
}
async function updateBlog(id) {
  await blogStore.updateSinglePost(id, updateItem);
  blogStore.data = blogStore.data.map((currItem) => {
    if (currItem.id == id) {
      return {
        ...currItem,
        title: updateItem.title,
        author: updateItem.author,
      };
    }
    return currItem;
  });
}
// ===================================================

// ==============add new blog=========================
const newBlogs = reactive({
  title: "",
  author: "",
});
async function addNewBlog() {
  await blogStore.addBlog(newBlogs);
  blogStore.data = [
    ...blogData.value,
    {
      sno: blogData.value.length + 1,
      title: newBlogs.title,
      author: newBlogs.author,
    },
  ];
  // after adding clear the input field
  newBlogs.title = "";
  newBlogs.author = "";
}
// ===================================================

// ============Searching with author name after 2 sec=========
const authorName = ref("");
let timeoutId = null;
async function searchAuthor() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    // write your logic here
    if (authorName.value) {
      blogStore.searchAuthor(authorName.value);
    } else {
      blogStore.fetchData();
    }
  }, 2000);
}
// ==================================================
</script>

<template>
  <h1 class="bg-green text-white text-center mb-3">CRUD OPERATION</h1>
  {{ blogData }}
  <!--============ Add New Blog========================== -->
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-btn
          v-bind="props"
          text="Add Blog"
          class="bg-green text-capitalize text-white"
        >
        </v-btn>
      </div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-form @submit.prevent="addNewBlog">
          <v-container>
            <v-row>
              <!-- title -->
              <v-col cols="12">
                <v-text-field
                  v-model="newBlogs.title"
                  label="Title"
                ></v-text-field>
              </v-col>
              <!-- author -->
              <v-col cols="12">
                <v-text-field
                  v-model="newBlogs.author"
                  label="Author"
                ></v-text-field>
              </v-col>
              <!-- submit and cancel btn -->
              <v-col cols="12">
                <!-- submit button -->
                <v-btn
                  type="submit"
                  class="bg-green text-white text-capitalize"
                  @click="isActive.value = false"
                  >Submit</v-btn
                >
                <!-- cancel button -->
                <v-btn
                  class="bg-red text-white text-capitalize ms-3"
                  @click="isActive.value = false"
                  >Cancel</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
  <!-- ================End of Add New Blog=============== -->

  <!--=============== Searching field =======================-->
  <v-form>
    <v-container class="d-flex">
      <!-- author -->
      <v-text-field
        v-model="authorName"
        label="Author"
        @keyup="searchAuthor"
        append-inner-icon="mdi:mdi-magnify"
      ></v-text-field>
    </v-container>
  </v-form>
  <!--============ end of serching field======================= -->

  <!-- ================Display Blog with loading========= -->
  <p v-if="blogStore.isLoading">Loading...</p>
  <v-data-table-server
    v-if="blogData.length"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="blogData"
    :loading="blogStore.isLoading"
    :items-length="blogData.length"
  >
    <template v-slot:item.actions="{ item }">
      <!-- view -->
      <v-btn
        icon="mdi:mdi-eye-outline"
        variant="plain"
        elevation="0"
        :to="`/single-blog/${item.id}`"
        color="green"
      ></v-btn>
      <!-- edit item with modal -->
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi:mdi-pencil"
            elevation="0"
            color="orange"
            variant="plain"
            @click="editItem(item)"
          >
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Edit Item">
            <v-form @submit.prevent="updateBlog(item.id)">
              <v-container>
                <v-row>
                  <!-- title -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="updateItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <!-- author -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="updateItem.author"
                      label="Author"
                    ></v-text-field>
                  </v-col>
                  <!-- submit and close button -->
                  <v-col cols="12">
                    <!-- submit button -->
                    <v-btn type="submit" @click="isActive.value = false"
                      >Submit</v-btn
                    >
                    <!-- modal close button -->
                    <v-btn text="Close" @click="isActive.value = false"></v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </template>
      </v-dialog>
      <!-- end of edit item modal -->

      <!-- delete -->
      <v-btn
        icon="mdi:mdi-delete"
        elevation="0"
        color="red"
        variant="plain"
        @click="deleteBlog(item.id)"
      ></v-btn>
    </template>
  </v-data-table-server>
  <div class="text-center" v-else>
    <p>No data to display</p>
  </div>
  <!-- ===============End of Display Blog=====================  -->
</template>
