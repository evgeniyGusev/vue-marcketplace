<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <button
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': page === 1}"
        aria-label="Предыдущая страница"
        :disabled="page === 1"
        @click.prevent="paginate(page - 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </button>
    </li>

    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        class="pagination__link"
        :class="{'pagination__link--current': pageNumber === page}"
        href="#"
        @click.prevent="paginate(pageNumber)"
      >{{pageNumber}}</a>
    </li>

    <li class="pagination__item">
      <button
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': page === pages}"
        aria-label="Следующая страница"
        :disabled="page === pages"
        @click.prevent="paginate(page + 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: "page",
    event: "paginate",
  },
  name: "BasePaginationList",
  props: {
    page: {
      type: Number,
      required: true,
      default: 1,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    perPage: {
      type: Number,
      required: false,
      default: 1,
    },
  },

  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },

  methods: {
    paginate(value) {
      this.$emit("paginate", value);
    },
  },
};
</script>

<style>
.pagination {
  margin: 0;
  padding: 0;
  list-style: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.catalog__pagination {
  margin-top: auto;
}
.pagination__link--disabled {
}

.pagination__link {
  display: block;
  padding: 13px 3px;
  height: 40px;
  min-width: 40px;
  font-size: 16px;
  line-height: 1;
  color: #222;
  text-align: center;
  background: none;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  cursor: pointer;
}
.pagination__link[href]:not(:disabled):focus,
.pagination__link[href]:not(:disabled):hover {
  opacity: 0.6;
}
.pagination__link--current {
  font-weight: 700;
  text-decoration: underline;
}
.pagination__link--arrow {
  border: 1px solid #e2e2e2;
}
.pagination__link--arrow:disabled {
  cursor: not-allowed;
  opacity: 0.2;
}
.pagination__item:first-child {
  margin-right: 25px;
}
.pagination__item:last-child {
  margin-left: 25px;
}
</style>