<template>
  <Layout>
    <div class="page__inner-wrap">
      <header>
        <h1 id="page-title" class="page__title p-name" itemprop="headline">
          Using TypeScript to validate translations at compile time
        </h1>
        <p class="page__meta">
          <span class="page__meta-date">
            <i class="far fa-calendar-alt" aria-hidden="true"></i>
            <time datetime="2022-03-30T19:36:32+00:00">March 30, 2022</time>
          </span>
        </p>
      </header>

      <section class="page__content e-content" itemprop="text">
        <p>
          In web applications as I know them, translations are mostly stored in
          JSONish format and accessed at runtime. Usually, the setup is more
          complex since the applications needs to support multiple translations.
          But for now let’s keep it as simple as possible.
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="kd">const</span> <span class="nx">translation</span> <span class="o">=</span> <span class="p">{</span>
            <span class="na">helloWorld</span><span class="p">:</span> <span class="dl">'</span><span class="s1">Hallo Welt!</span><span class="dl">'</span><span class="p">,</span>
            <span class="na">dialog</span><span class="p">:</span> <span class="p">{</span>
                <span class="na">title</span><span class="p">:</span> <span class="dl">'</span><span class="s1">Bestätigung</span><span class="dl">'</span><span class="p">,</span>
                <span class="na">description</span><span class="p">:</span> <span class="dl">'</span><span class="s1">Möchten Sie fortfahren?</span><span class="dl">'</span>
            <span class="p">},</span>
            <span class="na">actions</span><span class="p">:</span> <span class="p">{</span>
                <span class="na">buttons</span><span class="p">:</span> <span class="p">{</span>
                <span class="na">submit</span><span class="p">:</span> <span class="dl">'</span><span class="s1">Bestätigen</span><span class="dl">'</span><span class="p">,</span>
                <span class="na">cancel</span><span class="p">:</span> <span class="dl">'</span><span class="s1">Abbrechen</span><span class="dl">'</span>
                <span class="p">}</span>
            <span class="p">}</span>
            <span class="p">}</span>
            </code></pre>
          </div>
        </div>

        <p>
          To retrieve and display the translation at runtime there is a method
          called
          <code class="language-plaintext highlighter-rouge">translate</code>
          which returns the corresponding translation for a key from the
          translation object:
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="kd">type</span> <span class="nx">StringOnlyJson</span> <span class="o">=</span> <span class="kr">string</span> <span class="o">|</span> <span class="p">{</span> <span class="p">[</span><span class="na">property</span><span class="p">:</span> <span class="kr">string</span><span class="p">]:</span> <span class="nx">StringOnlyJson</span> <span class="p">};</span>

            <span class="kd">const</span> <span class="nx">translate</span> <span class="o">=</span> <span class="p">(</span><span class="nx">translationKey</span><span class="p">:</span> <span class="kr">string</span><span class="p">):</span> <span class="kr">string</span> <span class="o">=&gt;</span> <span class="p">{</span>
            <span class="kd">const</span> <span class="nx">result</span> <span class="o">=</span> <span class="nx">translationKey</span>
                <span class="p">.</span><span class="nx">split</span><span class="p">(</span><span class="dl">'</span><span class="s1">.</span><span class="dl">'</span><span class="p">)</span>
                <span class="p">.</span><span class="nx">reduce</span><span class="p">(</span>
                <span class="p">(</span><span class="nx">json</span><span class="p">,</span> <span class="nx">propertyName</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="k">typeof</span> <span class="nx">json</span> <span class="o">===</span> <span class="dl">'</span><span class="s1">object</span><span class="dl">'</span> <span class="p">?</span> <span class="nx">json</span><span class="p">[</span><span class="nx">propertyName</span><span class="p">]</span> <span class="p">:</span> <span class="kc">undefined</span><span class="p">,</span>
                <span class="nx">translation</span> <span class="k">as</span> <span class="nx">StringOnlyJson</span> <span class="o">|</span> <span class="kc">undefined</span>
                <span class="p">);</span>
            <span class="k">return</span> <span class="k">typeof</span> <span class="nx">result</span> <span class="o">===</span> <span class="dl">'</span><span class="s1">string</span><span class="dl">'</span> <span class="p">?</span> <span class="nx">result</span> <span class="p">:</span> <span class="nx">translationKey</span><span class="p">;</span>
            <span class="p">};</span>
            </code></pre>
          </div>
        </div>

        <p>
          If the method gets called with
          <code class="language-plaintext highlighter-rouge">dialog.title</code
          >, it will return
          <code class="language-plaintext highlighter-rouge">Bestätigung</code>:
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="nx">translate</span><span class="p">(</span><span class="dl">'</span><span class="s1">dialog.title</span><span class="dl">'</span><span class="p">);</span> <span class="c1">// returns 'Bestätigung'</span>
            </code></pre>
          </div>
        </div>

        <p>
          But what happens if an invalid or incorrect translation key is passed
          to the method? The method cannot find the corresponding translation
          and returns the passed key as a fallback. In the following example
          <code class="language-plaintext highlighter-rouge"
            >dialog.header</code
          >
          is passed instead of
          <code class="language-plaintext highlighter-rouge">dialog.title</code
          >.
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="nx">translate</span><span class="p">(</span><span class="dl">'</span><span class="s1">dialog.header</span><span class="dl">'</span><span class="p">);</span> <span class="c1">// returns 'dialog.header'</span>
            </code></pre>
          </div>
        </div>

        <p>
          In my experience this error pattern occurs quite often. A developer
          simply makes a typo in the translations or changes the naming of a
          translation key without adjusting them at each source code location.
          This results in the user seeing only the technical key instead of the
          expected translation. Such a fallback is helpful because the user can
          likely continue working with the application instead of getting a
          blank label or even worse an error message.
        </p>

        <p>
          As mentioned at the beginning, translations are usually loaded at
          runtime. Therefore, such errors do not occur earlier than at runtime.
          To detect and avoid such defects, an extensive test suite or a high
          manual testing effort is required. In worst case, such defects occur
          in production and are displayed to the end user.
        </p>

        <p>
          For this reason, errors should be found as early as possible and that
          is usually at compile time.
        </p>

        <p>
          Wouldn’t it be great if the translation keys could be checked
          automatically? Let’s jump into the power of TypeScript.
        </p>

        <p>
          In TypeScript there are these String Literal Types. Isn’t it possible
          to check the translation keys at compile time and inform the developer
          about his mistake? It would only need a list of all possible
          translation keys. That is worth a try:
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="kd">type</span> <span class="nx">TranslationKey</span> <span class="o">=</span>
  <span class="o">|</span> <span class="dl">'</span><span class="s1">helloWorld</span><span class="dl">'</span>
  <span class="o">|</span> <span class="dl">'</span><span class="s1">dialog.title</span><span class="dl">'</span>
  <span class="o">|</span> <span class="dl">'</span><span class="s1">dialog.description</span><span class="dl">'</span>
  <span class="o">|</span> <span class="dl">'</span><span class="s1">actions.buttons.submit</span><span class="dl">'</span>
  <span class="o">|</span> <span class="dl">'</span><span class="s1">actions.buttons.cancel</span><span class="dl">'</span><span class="p">;</span>
</code></pre>
          </div>
        </div>

        <p>
          Afterwards the signature of the
          <code class="language-plaintext highlighter-rouge">translate</code>
          method can be changed to use the type
          <code class="language-plaintext highlighter-rouge"
            >TranslationKey</code
          >
          for the
          <code class="language-plaintext highlighter-rouge"
            >translationKey</code
          >
          parameter instead of just
          <code class="language-plaintext highlighter-rouge">string</code>:
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="kd">const</span> <span class="nx">translate</span> <span class="o">=</span> <span class="p">(</span><span class="nx">translationKey</span><span class="p">:</span> <span class="nx">TranslationKey</span><span class="p">):</span> <span class="kr">string</span> <span class="o">=&gt;</span> <span class="p">{</span>
  <span class="c1">// same code as above</span>
<span class="p">};</span>
</code></pre>
          </div>
        </div>

        <p>
          This change leads to the fact that the method
          <code class="language-plaintext highlighter-rouge">translate</code>
          must only be called with one of the previously defined values. All
          other strings are treated as errors by the compiler.
        </p>

        <p>
          Back to the example from above. What happens if the
          <code class="language-plaintext highlighter-rouge">translate</code>
          method gets called with the correct
          <code class="language-plaintext highlighter-rouge">dialog.title</code>
          and the incorrect
          <code class="language-plaintext highlighter-rouge">dialog.header</code
          >?
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="nx">translate</span><span class="p">(</span><span class="dl">'</span><span class="s1">dialog.title</span><span class="dl">'</span><span class="p">);</span> <span class="c1">// compiles fine</span>
<span class="nx">translate</span><span class="p">(</span><span class="dl">'</span><span class="s1">dialog.header</span><span class="dl">'</span><span class="p">);</span> <span class="c1">// compiler error: Argument of type '"dialog.header"' is not assignable to parameter of type 'TranslationKey'.</span>
</code></pre>
          </div>
        </div>

        <p>
          The compiler gives an error message on the second call. The program
          does not compile and the developer is forced to correct the mistake.
        </p>

        <p>
          This solution works very well and is easy to implement. Problem
          solved. :-)
        </p>

        <p>Well…</p>

        <p>
          This solution requires the developer to maintain all translation keys
          twice: once in the actual translation and a second time in the
          definition of the
          <code class="language-plaintext highlighter-rouge"
            >TranslationKey</code
          >
          type. These two definitions must always be kept in sync to avoid the
          above mentioned errors of missing translations. This process is
          tedious, error-prone and in the end does not lead to any improvement.
        </p>

        <p>
          Is there no way to create the
          <code class="language-plaintext highlighter-rouge"
            >TranslationKey</code
          >
          type automatically? The TypeScript compiler would only have to extract
          the translation keys from the JSON object and concatenate them with a
          dot.
        </p>

        <p>
          Indeed, TypeScript can derive the
          <code class="language-plaintext highlighter-rouge"
            >TranslationKey</code
          >!
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="kd">type</span> <span class="nx">DeepKeysOf</span><span class="o">&lt;</span><span class="nx">T</span><span class="p">,</span> <span class="nx">Key</span> <span class="kd">extends</span> <span class="kr">keyof</span> <span class="nx">T</span> <span class="o">=</span> <span class="kr">keyof</span> <span class="nx">T</span><span class="o">&gt;</span> <span class="o">=</span> <span class="nx">Key</span> <span class="kd">extends</span> <span class="kr">string</span>
  <span class="p">?</span> <span class="nx">T</span><span class="p">[</span><span class="nx">Key</span><span class="p">]</span> <span class="kd">extends</span> <span class="kr">string</span> <span class="p">?</span> <span class="nx">Key</span> <span class="p">:</span> <span class="s2">`</span><span class="p">${</span><span class="nx">Key</span><span class="p">}</span><span class="s2">.</span><span class="p">${</span><span class="nx">DeepKeysOf</span><span class="o">&lt;</span><span class="nx">T</span><span class="p">[</span><span class="nx">Key</span><span class="p">]</span><span class="o">&gt;</span><span class="p">}</span><span class="s2">`</span>
  <span class="p">:</span> <span class="nx">never</span><span class="p">;</span>

<span class="kd">type</span> <span class="nx">TranslationKey</span> <span class="o">=</span> <span class="nx">DeepKeysOf</span><span class="o">&lt;</span><span class="k">typeof</span> <span class="nx">translation</span><span class="o">&gt;</span><span class="p">;</span>
</code></pre>
          </div>
        </div>

        <p>
          The type
          <code class="language-plaintext highlighter-rouge"
            >TranslationKey</code
          >
          is identical to the manual definition from above. The behavior of the
          compiler is as well identical, a call to the
          <code class="language-plaintext highlighter-rouge">translate</code>
          method with an incorrect translation key will raise an error.
        </p>

        <p>
          But what exactly does the
          <code class="language-plaintext highlighter-rouge">DeepKeysOf</code>
          type do? Let’s look at the crucial part first:
        </p>

        <div class="language-typescript highlighter-rouge">
          <div class="highlight">
            <pre
              class="highlight"
            ><code><span class="nx">T</span><span class="p">[</span><span class="nx">Key</span><span class="p">]</span> <span class="kd">extends</span> <span class="kr">string</span> <span class="p">?</span> <span class="nx">Key</span> <span class="p">:</span> <span class="s2">`</span><span class="p">${</span><span class="nx">Key</span><span class="p">}</span><span class="s2">.</span><span class="p">${</span><span class="nx">DeepKeysOf</span><span class="o">&lt;</span><span class="nx">T</span><span class="p">[</span><span class="nx">Key</span><span class="p">]</span><span class="o">&gt;</span><span class="p">}</span><span class="s2">`</span>
</code></pre>
          </div>
        </div>

        <p>
          <code class="language-plaintext highlighter-rouge">T</code> is the
          type definition of the translation object,
          <code class="language-plaintext highlighter-rouge">Key</code> is a
          property of the translation object,
          <code class="language-plaintext highlighter-rouge">T[Key]</code> is
          therefore the value of this property.
          <code class="language-plaintext highlighter-rouge">T[Key]</code> can
          be either a
          <code class="language-plaintext highlighter-rouge">string</code>, like
          <code class="language-plaintext highlighter-rouge"
            >'Hello World!'</code
          >
          or another object, like the value of
          <code class="language-plaintext highlighter-rouge">dialog</code>. In
          the first case, the execution can be stopped and the result is simply
          <code class="language-plaintext highlighter-rouge">helloWorld</code>.
          In the second case a recursion is called, which adds
          <code class="language-plaintext highlighter-rouge">.</code> to the
          <code class="language-plaintext highlighter-rouge">Key</code> and
          again uses the type definition
          <code class="language-plaintext highlighter-rouge">DeepKeysOf</code>
          for the object of
          <code class="language-plaintext highlighter-rouge">T[Key]</code>. With
          the help of this recursion it is possible to use arbitrarily deeply
          nested translation objects.
        </p>

        <p>
          A practical example for
          <code class="language-plaintext highlighter-rouge"
            >DeepKeysOf&lt;typeof translation&gt;</code
          >: <code class="language-plaintext highlighter-rouge">T</code> is the
          entire translation object,
          <code class="language-plaintext highlighter-rouge">Key</code> is a
          property of this, i.e.
          <code class="language-plaintext highlighter-rouge">helloWorld</code>,
          <code class="language-plaintext highlighter-rouge">dialog</code> or
          <code class="language-plaintext highlighter-rouge">action</code>.
          <code class="language-plaintext highlighter-rouge">T[Key]</code> is
          the value of this property, for the
          <code class="language-plaintext highlighter-rouge">Key</code>
          <code class="language-plaintext highlighter-rouge">helloWorld</code>
          it is
          <code class="language-plaintext highlighter-rouge"
            >'Hello World!'</code
          >
          , for
          <code class="language-plaintext highlighter-rouge">dialog</code> it is
          the object
          <code class="language-plaintext highlighter-rouge"
            >{ title: 'Bestätigung', description: 'Möchten Sie fortfahren?'
            }</code
          >. Thus, if
          <code class="language-plaintext highlighter-rouge">Key</code> is
          <code class="language-plaintext highlighter-rouge">helloWorld</code>
          then the expression
          <code class="language-plaintext highlighter-rouge"
            >T[Key] extends string</code
          >
          holds true and thus the result of the expression will be
          <code class="language-plaintext highlighter-rouge">helloWorld</code>.
          On the other hand, if
          <code class="language-plaintext highlighter-rouge">Key</code> is
          <code class="language-plaintext highlighter-rouge">dialog</code>, then
          <code class="language-plaintext highlighter-rouge">T[Key]</code> is an
          object, the expression holds false, and the result is a concatenation
          of
          <code class="language-plaintext highlighter-rouge">dialog.</code>
          (including the dot) with the result of
          <code class="language-plaintext highlighter-rouge"
            >DeepKeysOf&lt;T['dialog']&gt;</code
          >.
        </p>

        <p>
          However, it still has to be clarified how to iterate through the
          different properties within an object. For this purpose
          <code class="language-plaintext highlighter-rouge">keyof</code> and a
          type alias named
          <code class="language-plaintext highlighter-rouge">Key</code> is used:
          <code class="language-plaintext highlighter-rouge"
            >Key extends keyof T = keyof T</code
          >.
          <code class="language-plaintext highlighter-rouge">keyof T</code> is
          an alias for all properties of the object
          <code class="language-plaintext highlighter-rouge">T</code> and allows
          in that way an iteration through all properties.
          <code class="language-plaintext highlighter-rouge">Key</code> then
          contains the current property selected by the iteration through
          <code class="language-plaintext highlighter-rouge">keyof T</code>. The
          actual iteration is performed by TypeScript itself.
        </p>

        <p>
          As a last point there is the wrapper
          <code class="language-plaintext highlighter-rouge"
            >Key extends string ? ... : never</code
          >
          around the actual expression (abbreviated by …). In the translation
          object
          <code class="language-plaintext highlighter-rouge">Key</code> is
          always a
          <code class="language-plaintext highlighter-rouge">string</code>, so
          this expression is actually not relevant. But TypeScript does not
          actually know this, because this has not been defined. But for the
          later concatenation with
          <code class="language-plaintext highlighter-rouge">.</code> TypeScript
          expects a
          <code class="language-plaintext highlighter-rouge">string</code> (or
          several other types). By the way, the else branch with the result
          <code class="language-plaintext highlighter-rouge">never</code> is not
          called with the translation object. But if the object would contain
          some keys which are not
          <code class="language-plaintext highlighter-rouge">string</code> (i.e.
          <code class="language-plaintext highlighter-rouge">number</code>, or
          similar), then using
          <code class="language-plaintext highlighter-rouge">never</code> the
          corresponding invalid branches in the input object would be ignored.
        </p>

        <p>
          This entire implementation is also available for simple follow up on
          the
          <a
            href="https://www.typescriptlang.org/play?#code/PTAEFUGcEsDsHNQBUCeAHAppAxgJ2mgC6iED2oAbgIYA20AJlYRiblbJDU9KR6E6GykAtmmg0WhaMIwAoEKAAWhQmkgAuEIUUiqkAHRpcGaJE4Zc+mcABGNUvGAAmAAxOnwFwGZgXl8ABXGAQAWkJ0LDwCQjDSEOo6RmYwtg4uKV5IEKYQoVFxDDDpOVkhDmJCVM5uXlAAXlAAb1lQJQwaewB1UlwaenVQAHIACVp7UE72wgBCQYAaFtB6aFoHAebW1qlCCQHBgCEsQgATqXgAhHnF1vpI-CIeWD2AWQA37GUMWFAAZWgWABmPUIAKoimMsAA-INFgBfBatKjYDIcdbXUA2AIqTJozabSABGzCaCEPaHSAnM5fK541rYdjYdp7ACCNhsxg+1PRsLhsh5snCmFAABEMBg0ABpDAoSAAeQBAB4kHNQFKUKAMAAPZiweiQUAAa2lpAByHqhuNpqQAD56ui1RrtV89aAKfgEOjIcgANpqgC6jp1LrdcEQXodAwABgASRpq2H6WOi8VquWKpC+6V+62wyPogawDAUCyyAURZBVdKPB0NZOS6VphWCjAm1jsaoo60AblLzd+lVDstgNBQAClILUGiGEKAAD5NUDeoykTC4cIDafwP0DH4DhBDkfj2qwnulTIVStMFgNAAUlXbVd4aoGSEvKLVAEoN3vEHVbRtNjKClQGMAkaGIBp7zSGpYDVdE8X0SA0DoQgbwAIn0NCP3gzZ9GMegAkZG8cNpUAbwAKwnWAVWXVdwgAOSoGQP3qW1m1bSjJzqBpBlIGxyIwZFBlAL1ONgJdcBXCwGKYjAAwGC5bgBOAMHoBFSNpKCO0efh9V3d14APMcqLnUBFIwZTC3oD8ezxYxCACXBvnY01QICcD6m4oZN2Er03I8gYtMfWDpR7E9ezfDAb0GZZVngfRtgkQYbIFSLoti+x4sUDAqFuXBkp7IA"
            >TypeScript Playground</a
          >.
        </p>

        <p>
          In the end, this solution is very powerful, thanks to TypeScript’s
          extensive type system. Translations are no longer as error-prone as I
          know from my past. Overall, a single type definition increases the
          quality of the software and this quality can also be checked
          automatically at compile-time.
        </p>

        <p>
          Comments are welcome on
          <a href="https://twitter.com/TheThomasPr/status/1509516711434895364"
            >Twitter</a
          >
          or
          <a
            href="https://www.linkedin.com/posts/thomas-preissler_using-typescript-to-validate-translations-activity-6915282669471698944-PGmU"
            >LinkedIn</a
          >.
        </p>
      </section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Layout from "../components/Layout.vue";

onMounted(() => {
  document.querySelectorAll("pre code").forEach((el: Element) => {
    window.hljs.highlightElement(el);
  });
});
</script>

<style lang="less" scoped>
p > code,
a > code,
li > code,
figcaption > code,
td > code {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  font-size: 0.8em;
  background: #fafafa;
  border-radius: 4px;
}
/deep/ .hljs-title {
  color: #2196f3;
}
p {
  line-height: 1.5;
  margin-bottom: 1.3em;
}
pre code.hljs {
  padding: 1em;
  border-radius: 0.2em;
  margin-bottom: 1.3em;
}
</style>
