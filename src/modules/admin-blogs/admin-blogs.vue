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
const updateBlogModal = ref(false);
const editId = ref(null);
const updateItem = reactive({
  title: "",
  author: "",
});
function editItem(item) {
  updateItem.title = item.title;
  updateItem.author = item.author;
  updateBlogModal.value = true;
  editId.value = item.id;
}
async function updateBlog() {
  await blogStore.updateSinglePost(editId.value, updateItem);
  updateBlogModal.value = false;
  blogStore.data = blogStore.data.map((currItem) => {
    if (currItem.id == editId.value) {
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
  if (valid.value) {
    await blogStore.addBlog(newBlogs);
    if (!blogStore.postError) {
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
      addBlogModal.value = false;
    }
  }
}
// ===================================================

// ============Searching with author name after 2 sec=========
const searchKeyword = ref("");
let timeoutId = null;
async function searchItemFromBlog() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    // write your logic here
    if (searchKeyword.value) {
      blogStore.searchFromBlog(searchKeyword.value);
    } else {
      blogStore.fetchData();
    }
  }, 2000);
}
// ==================================================

// ==========Title validation=====================
const addBlogModal = ref(false);
const valid = ref(false);
const titleRules = ref([
  (value) => {
    if (value) return true;
    return "Title is required.";
  },
  (value) => {
    if (value?.length <= 10) return true;
    return "Title must be less than 10 characters.";
  },
]);
// ==============================================
</script>

<template>
  <h1 class="bg-green text-white text-center mb-3">CRUD OPERATION</h1>
  {{ blogData }}
  <!--============ Add New Blog========================== -->
  <div class="text-center">
    <v-btn color="primary">
      Add Blog

      <v-dialog v-model="addBlogModal" activator="parent" width="500">
        <v-card>
          <v-form @submit.prevent="addNewBlog" v-model="valid">
            <v-container>
              <v-row>
                <!-- title -->
                <v-col cols="12">
                  <v-text-field
                    :rules="titleRules"
                    v-model="newBlogs.title"
                    label="Title"
                    required
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
                    >Submit</v-btn
                  >
                  <!-- cancel button -->
                  <v-btn
                    class="bg-red text-white text-capitalize ms-3"
                    @click="addBlogModal = false"
                    >Cancel</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
  <!-- ================End of Add New Blog=============== -->

  <!--=============== Searching field =======================-->
  <v-form>
    <v-container class="d-flex">
      <!-- author -->
      <v-text-field
        v-model="searchKeyword"
        label="Search From Blog"
        @keyup="searchItemFromBlog"
        append-inner-icon="mdi:mdi-magnify"
      ></v-text-field>
    </v-container>
  </v-form>
  <!--============ end of serching field======================= -->

  <!-- edit modal -->
  <v-dialog v-model="updateBlogModal" width="600">
    <v-card>
      <v-form @submit.prevent="updateBlog()">
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
              <v-btn type="submit" color="green" class="text-capitalize"
                >Submit</v-btn
              >
              <!-- modal close button -->
              <v-btn
                text="Cancel"
                @click="updateBlogModal = false"
                color="red"
                class="text-capitalize ms-3"
              ></v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
  <!-- end of edit modal -->

  <!-- ================Display Blog with loading========= -->
  <p v-if="blogStore.isLoading">Loading...</p>
  <v-data-table-virtual
    v-if="blogData.length"
    :items-per-page="blogData.length"
    :headers="headers"
    :items="blogData"
    :loading="blogStore.isLoading"
    :items-length="blogData.length"
  >
    <template v-slot:item.actions="{ item }">
      <div class="d-flex align-center">
        <!-- view -->
        <v-btn
          icon="mdi:mdi-eye-outline"
          variant="plain"
          elevation="0"
          :to="`/single-blog/${item.id}`"
          color="green"
        ></v-btn>
        <!-- edit item with modal -->
        <div class="text-center">
          <v-btn
            elevation="0"
            color="orange"
            variant="plain"
            icon="mdi:mdi-pencil"
            @click="editItem(item)"
          >
          </v-btn>
        </div>
        <!-- end of edit item modal -->

        <!-- delete -->
        <v-btn
          icon="mdi:mdi-delete"
          elevation="0"
          color="red"
          variant="plain"
          @click="deleteBlog(item.id)"
        ></v-btn>
      </div>
    </template>
  </v-data-table-virtual>
  <div class="text-center" v-else>
    <p>No data to display</p>
  </div>
  <!-- ===============End of Display Blog=====================  -->
</template>
