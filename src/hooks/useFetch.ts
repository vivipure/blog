import { nextTick, reactive, Ref, ref } from "vue";
import { useRouter } from "vue-router";

export const useFetch = (
  url: string,
  refDOM: Ref<Element | undefined>
) => {
  const post = reactive<{
    id: string;
    title: string;
    content: string;
  }>({
    id: "",
    title: "",
    content: "",
  });
  const router = useRouter();

  fetch(url)
    .then((res) => {
      if (res.status == 200) return res.text();
      router.push("/");
    })
    .then((res) => {
      const contentMap: Record<string, any> = JSON.parse(res as string);
      Object.assign(post, contentMap);
      nextTick(() => {
        (refDOM.value as Element)
          ?.querySelectorAll("pre code")
          .forEach((codeElement) => {
            window.hljs.highlightElement(codeElement);
          });
      });
    });

  return {
    post,
  };
};
