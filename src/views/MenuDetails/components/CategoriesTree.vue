<template>
  <t-panel title="Menu structure">
    <div class="flex justify-end">
      <span class="cursor-pointer text-blue-500" @click="$emit('clickAddCategory')">
        <fa-icon icon="plus" /> Add category
      </span>
    </div>
    <div class="max-h-120 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar pr-2">
      <Tree :value="treeData" :ondragend="ondragend" folding-transition="">
        <template #default="{ node }">
          <div class="flex" @click="onElementClick(node)">
            <div class="flex-1">
              {{ node.name }}
            </div>
            <span
              v-if="node.children"
              class="cursor-pointer text-blue-500"
              @click.stop="$emit('clickAddItem', node.id)"
            >
              <fa-icon icon="plus" /> Add item
            </span>
          </div>
        </template>
      </Tree>
    </div>
  </t-panel>
</template>
<script>
import "he-tree-vue/dist/he-tree-vue.css";

import { Tree, Draggable, Fold } from "he-tree-vue";
import TPanel from "@/components/TPanel";
import categoriesData from "@/api/category/categories";
import changeItemOrder from "@/api/item/changeOrder";
import changeCategoryOrder from "@/api/category/changeOrder";

export default {
  components: {
    Tree: Tree.mixPlugins([Draggable, Fold]),
    TPanel,
  },
  emits: ["clickAddItem", "clickAddCategory", "clickEdit"],
  data() {
    return {
      treeData: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ondragend(tree, store) {
      if (
        store.startPath.length != store.targetPath.length ||
        store.startPath.at(-2) != store.targetPath.at(-2)
      ) {
        return false;
      } else {
        if (Object.hasOwn(store.dragNode, "children")) {
          changeCategoryOrder(
            this.$route.params.restaurantId,
            this.$route.params.menuId,
            store.dragNode.id,
            store.targetPath.at(-1)
          );
        } else {
          changeItemOrder(
            this.$route.params.restaurantId,
            this.$route.params.menuId,
            store.dragNode.CategoryId,
            store.dragNode.id,
            store.targetPath.at(-1)
          );
        }
      }
    },
    async fetchData() {
      this.loading = true;
      try {
        this.treeData = await categoriesData(
          this.$route.params.restaurantId,
          this.$route.params.menuId
        );
      } catch (e) {
        this.error = e.message;
      }
      this.loading = false;
    },
    onElementClick(node) {
      this.$emit("clickEdit", node);
    },
  },
};
</script>
