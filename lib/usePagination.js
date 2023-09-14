import { ref } from "vue";

/** 페이지네이션에 필요한 값들을 리턴합니다.
 * @function usePagination
 * @param {any[]} items 페이지네이션할 아이템
 * @param {number} itemSize 등장할 아이템 갯수
 * @param {number} pageSize 등장할 페이지 갯수
 */
const usePagination = (items, itemSize = 10, pageSize = 10) => {
  const key = Math.random();
  /** _min <= now <= _max
   * @default {ref(1)}
   */
  const now = ref(1);
  /**
   * @private
   * @protected
   */
  const _min = ref(1);
  /**
   * @private
   * @protected
   */
  const _max = ref(1);
  /** 현재 등장한 첫번째 페이지
   * @protected
   */
  const nowMin = ref(Math.floor((now.value - 1) / pageSize) * pageSize + 1);
  /** 현재 등장한 마지막 페이지
   * @protected
   */
  const nowMax = ref(nowMin.value + pageSize - 1);

  /** 아이템이 비어있지 않다면 초기화 */
  if (items.length !== 0)
    _max.value =
      items.length % itemSize === 0
        ? items.length / itemSize
        : Math.ceil(items.length / itemSize);
  if (nowMin.value < _min.value) nowMin.value = _min.value;
  if (nowMax.value > _max.value) nowMax.value = _max.value;

  /** 현재 등장할 아이템 */
  const currentItems = ref(
    items.slice(
      (now.value - 1) * itemSize,
      items.length < now.value * itemSize ? items.length : now.value * itemSize
    )
  );
  /** 현재 등장할 페이지 */
  const currentPages = ref(
    Array.from(
      { length: _max.value > nowMax.value ? pageSize : nowMax.value },
      (v, k) => k + now.value
    )
  );

  /** 표시될 아이템이 교체됩니다.
   * @param {number} number page
   */
  function pageChangeEvent(number) {
    if (number <= 0) number = _min.value;
    else if (number > _max.value) number = _max.value;

    now.value = number;
    currentItems.value = items.slice(
      (now.value - 1) * itemSize,
      items.length < now.value * itemSize ? items.length : now.value * itemSize
    );
  }
  /** 페이지 리스트가 교체됩니다.
   * @param {number} number page
   */
  function indicatorChange(number) {
    if (number >= _max.value) {
      number = nowMax.value;
      pageChangeEvent(number);
      return;
    }

    if (number <= _min.value) {
      number = nowMin.value;
      pageChangeEvent(number);
      return;
    }

    pageChangeEvent(number);

    nowMin.value = Math.floor((now.value - 1) / pageSize) * pageSize + 1;
    nowMax.value = nowMin.value + pageSize - 1;
    if (nowMax.value > _max.value) nowMax.value = _max.value;

    currentPages.value = Array.from(
      { length: _max.value > nowMax.value ? pageSize : nowMax.value },
      (v, k) => k + nowMin.value
    );
  }
  /** 이전 페이지로 이동합니다. */
  function prev() {
    indicatorChange(nowMin.value - 1);
  }
  /** 다음 페이지로 이동합니다. */
  function next() {
    indicatorChange(nowMax.value + 1);
  }
  /** 첫번째 페이지로 이동합니다. */
  function first() {
    indicatorChange(_min.value);
  }
  /** 마지막 페이지로 이동합니다. */
  function last() {
    indicatorChange(_max.value);
  }

  return {
    key,
    now,
    nowMin,
    nowMax,
    first,
    prev,
    next,
    last,
    currentItems,
    currentPages,
    pageChangeEvent,
    indicatorChange,
  };
};

export default usePagination;
