import {  Ref, ref } from "vue";
import { useRouter } from "vue-router";

export const useFetch = (url: string, id: string, refDOM: Ref<Element | undefined>) => {
  const html = ref<string>("");
  const router = useRouter();

  fetch(url)
    .then((res) => {
      if (res.status == 200) return res.text();
      router.push("/");
    })
    .then((res) => {
      const contentMap: Record<string, any> = JSON.parse(res as string)
      refDOM.value!.innerHTML = contentMap[id]
    });

  return {
    html,
  };
};
