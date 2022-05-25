import { marked } from "marked";
import { nextTick, Ref, ref } from "vue";
import { useRouter } from "vue-router";

export const useMarkdown = (url: string, refDOM: Ref<Element | undefined>) => {
  const html = ref<string>("");
  const loading = ref<boolean>(true);
  const router = useRouter();

  fetch(url)
    .then((res) => {
      if (res.status == 200) return res.text();
      router.push("/");
    })
    .then((res) => {
      html.value = marked(res as string);
      setTimeout(() => {
        loading.value = false;
      }, 1500);
      nextTick(() => {
        refDOM.value?.querySelectorAll("pre code").forEach((codeElement) => {
          window.hljs.highlightElement(codeElement);
        });
      });
    });

  return {
    html,
    loading,
  };
};
