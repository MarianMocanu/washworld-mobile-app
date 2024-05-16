import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

export const LogoSVG: React.FC = (props: SvgProps) => (
  <Svg width={100} height={42} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M0 26.348v.598h99.704v-.598H0Zm7.132 7.746c-.703 2.133-1.93 5.49-2.555 7.701a6.317 6.317 0 0 0-.762-.079 6.53 6.53 0 0 0-.771.08C2.398 39.05.257 31.645.037 30.972c.417.047.836.073 1.256.078.404-.004.807-.03 1.208-.078.61 2.68 1.39 5.725 1.958 7.922h.028c.884-2.638 2.153-6.462 2.573-7.922.246.048.496.074.747.078.25-.004.5-.03.746-.078.269 1.395 1.822 5.849 2.36 7.922h.03c.763-2.638 1.941-6.685 2.21-7.922.206.047.417.073.628.078.231-.005.461-.031.688-.078-.409 1.206-2.454 7.357-3.406 10.822a6.337 6.337 0 0 0-.76-.079 6.53 6.53 0 0 0-.772.08c-.643-2.575-1.464-5.13-2.36-7.702h-.04Zm22.054-2.432c-2.046 0-3.241 2.166-3.241 4.863 0 3.34 1.462 4.504 3.136 4.504 1.792 0 3.361-1.569 3.361-4.99 0-2.72-1.33-4.377-3.256-4.377Zm.044-.894c3.167 0 5.66 1.813 5.66 5.6 0 3.109-2.374 5.632-5.706 5.632-3.152 0-5.692-1.693-5.692-5.614 0-3.092 2.27-5.618 5.736-5.618h.002Zm20.36 1.1c-.031 1.425-.047 2.836-.047 4.264.11.019.22.03.33.033 1.316 0 2.032-.77 2.032-2.244 0-1.85-.688-2.053-2.315-2.053Zm.09 4.94h-.137v.647c0 1.757.03 2.966.12 4.346a9.521 9.521 0 0 0-2.444 0c.089-1.38.118-2.59.118-4.346v-2.138c0-1.756-.03-2.965-.118-4.344.33.03.733.078 1.226.078.535 0 1.18-.078 2.196-.078 1.507 0 2.058.139 2.581.534.599.453.972 1.144.972 2.072 0 1.523-.835 2.494-2.316 2.886.957 1.774 2.09 3.564 3.181 5.334-.447-.03-.9-.079-1.343-.079-.442 0-.912.048-1.362.08l-2.674-4.992Zm20.628-1.491c0-1.756-.032-2.965-.122-4.344.328.03.732.078 1.226.078s.9-.048 1.226-.078c-.09 1.38-.121 2.59-.121 4.344v2.133c0 1.166.016 2.353.03 3.17a28.016 28.016 0 0 0 3.422-.206c-.042.233-.062.47-.061.708a3.22 3.22 0 0 0 .061.672c-.54-.014-1.24-.075-2.616-.075-2.435 0-2.84.045-3.167.075.09-1.38.122-2.59.122-4.344v-2.133Zm22.201 2.479c0 .847 0 2.76.016 3.056.3.019.701.051 1.313.051 2.242 0 3.66-1.6 3.66-4.863 0-2.573-1.358-4.173-3.42-4.173-.52-.006-1.038.02-1.553.079-.016.296-.016 2.21-.016 3.056v2.794Zm-2.206-2.48c0-1.755-.03-2.964-.118-4.343.327.03.728.078 1.223.078.654 0 1.39-.078 2.702-.078 3.405 0 5.75 1.145 5.75 5.096 0 3.453-2.36 5.725-5.168 5.725-1.496 0-2.51-.075-3.286-.075-.496 0-.9.045-1.224.075.09-1.38.119-2.59.119-4.344l.002-2.133ZM.201.377h6.432L8.948 12.73 12.338.377h6.408l3.398 12.335L24.459.377h6.401l-4.83 22.065h-6.64L15.546 8.548l-3.83 13.894h-6.64L.201.377ZM46.546 18.8h-7.689l-1.067 3.643h-6.917L39.106.377h7.386l8.233 22.065h-7.083l-1.096-3.643Zm-1.405-4.77-2.418-7.933-2.394 7.932h4.812Zm10.565 1.113 6.442-.407c.141 1.055.425 1.857.853 2.408.698.894 1.694 1.34 2.99 1.34.966 0 1.71-.228 2.234-.685.524-.456.786-.986.785-1.587 0-.573-.25-1.085-.747-1.535-.499-.451-1.656-.878-3.474-1.28-2.97-.673-5.087-1.566-6.353-2.68s-1.902-2.533-1.908-4.26a5.81 5.81 0 0 1 .98-3.218c.651-1.008 1.633-1.8 2.944-2.378 1.311-.578 3.108-.864 5.39-.86 2.8 0 4.936.524 6.404 1.572 1.47 1.049 2.343 2.717 2.62 5.005l-6.382.377c-.172-.993-.528-1.715-1.07-2.167-.54-.452-1.29-.677-2.249-.677-.787 0-1.38.168-1.779.503a1.543 1.543 0 0 0-.598 1.227c0 .35.165.667.494.948.33.282 1.086.553 2.272.813 2.959.643 5.08 1.29 6.36 1.943 1.282.653 2.214 1.468 2.796 2.445.586.987.89 2.118.875 3.267a7.029 7.029 0 0 1-1.167 3.913 7.314 7.314 0 0 1-3.259 2.72c-1.396.616-3.154.925-5.274.926-3.728 0-6.309-.723-7.744-2.169-1.434-1.445-2.246-3.28-2.435-5.504ZM79.027.377h6.774v7.72h7.397V.378H100v22.065h-6.802v-8.925H85.8v8.925h-6.774V.377Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h100v42H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
