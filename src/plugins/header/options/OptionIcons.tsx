import React from 'jsx-dom';
/**
 * Base class for icons
 */
export class UIPOptionIcons {
  /** Default svg for theme icons */
  public static themeSVG: HTMLElement = (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" stroke="#4e4e4e" stroke-width="1.25" fill="none">
        <path xmlns="http://www.w3.org/2000/svg" d="M2.25 8.5 C 5 17.5, 18.5 17.5, 21.25 8.5" transform="rotate(45,12.5,12.5)" stroke-linecap="round"/>
        <path xmlns="http://www.w3.org/2000/svg" d="M2.25 8.5 C -1 26, 24.75 26, 21.25 8.5" transform="rotate(45,12.5,12.5)" stroke-linecap="round"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none">
        {/* eslint-disable-next-line max-len */}
        <path fill="#5F5F5F" d="M12.445.302a.682.682 0 0 0-.072.018.581.581 0 0 0-.453.58v3.48a.583.583 0 0 0 .287.51.586.586 0 0 0 .585 0 .583.583 0 0 0 .288-.51V.9a.58.58 0 0 0-.634-.598ZM4.18 3.709a.576.576 0 0 0-.453.408.583.583 0 0 0 .163.59L6.355 7.17c.14.172.365.252.583.202a.583.583 0 0 0 .435-.435.583.583 0 0 0-.202-.582L4.706 3.89a.582.582 0 0 0-.471-.182H4.18Zm16.458 0a.583.583 0 0 0-.344.182l-2.465 2.465a.583.583 0 0 0-.202.582c.05.215.22.385.435.435.217.05.442-.03.582-.202l2.465-2.465a.58.58 0 0 0-.471-.997ZM12.445 6.7l-.054.018a.606.606 0 0 0-.109.018l-.018.018C9.187 6.886 6.7 9.392 6.7 12.5c0 3.192 2.608 5.8 5.8 5.8 3.192 0 5.8-2.608 5.8-5.8 0-3.097-2.468-5.594-5.528-5.746-.02 0-.034-.018-.055-.018a.561.561 0 0 0-.18-.036h-.092Zm.019 1.16h.09a4.64 4.64 0 1 1-.09 0ZM.737 11.92A.587.587 0 0 0 .9 13.08h3.48a.583.583 0 0 0 .51-.288.586.586 0 0 0 0-.584.583.583 0 0 0-.51-.288H.737Zm19.72 0a.587.587 0 0 0 .163 1.16h3.48a.584.584 0 0 0 .51-.288.586.586 0 0 0 0-.584.584.584 0 0 0-.51-.288h-3.643ZM6.7 17.648a.583.583 0 0 0-.345.18L3.89 20.295a.583.583 0 0 0-.201.582c.05.215.22.385.435.435.217.05.442-.03.582-.202l2.465-2.465a.578.578 0 0 0-.417-.996H6.7Zm11.419 0a.576.576 0 0 0-.454.407.583.583 0 0 0 .164.59l2.465 2.464a.582.582 0 0 0 1.017-.233.583.583 0 0 0-.202-.582l-2.465-2.465a.58.58 0 0 0-.417-.181h-.108Zm-5.674 2.374a.674.674 0 0 0-.072.018.581.581 0 0 0-.453.58v3.48a.584.584 0 0 0 .287.51.586.586 0 0 0 .585 0 .584.584 0 0 0 .288-.51v-3.48a.58.58 0 0 0-.634-.598Z"/>
      </svg>
    </>) as HTMLElement;

  /** Default svg for rtl direction icon */
  public static rtlDirectionSVG: HTMLElement = (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 17" fill="#4e4e4e">
        {/* eslint-disable-next-line max-len */}
        <path fill="#4e4e4e" d="M10.202 14.5v1.686h-7.82V14.5h7.82ZM2.79.546v15.64H.717V.546H2.79Zm12.6 0v15.64h-2.04V.546h2.04Zm5.028 0v1.697H8.333V.546h12.085Zm2.32 0h5.178c1.174 0 2.166.179 2.976.537.816.358 1.436.888 1.858 1.59.43.695.645 1.55.645 2.567 0 .716-.147 1.372-.44 1.966a4.183 4.183 0 0 1-1.247 1.504c-.537.408-1.182.713-1.934.913l-.58.226h-4.866l-.021-1.687h3.674c.744 0 1.364-.129 1.858-.387.494-.265.866-.62 1.117-1.063a2.95 2.95 0 0 0 .376-1.472c0-.601-.118-1.128-.355-1.579-.236-.451-.608-.798-1.117-1.042-.501-.25-1.15-.376-1.944-.376h-3.105v13.944h-2.073V.545Zm9.142 15.64-3.803-7.09 2.16-.01 3.856 6.972v.128H31.88Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 17" fill="#4e4e4e">
        {/* eslint-disable-next-line max-len */}
        <path fill="#4e4e4e" d="M0.716797 0.545898H5.89453C7.06901 0.545898 8.06087 0.724935 8.87012 1.08301C9.68652 1.44108 10.306 1.97103 10.7285 2.67285C11.1582 3.36751 11.373 4.22331 11.373 5.24023C11.373 5.95638 11.2262 6.61165 10.9326 7.20605C10.6462 7.79329 10.2308 8.2946 9.68652 8.70996C9.14941 9.11816 8.50488 9.42253 7.75293 9.62305L7.17285 9.84863H2.30664L2.28516 8.16211H5.95898C6.70378 8.16211 7.32324 8.0332 7.81738 7.77539C8.31152 7.51042 8.68392 7.15592 8.93457 6.71191C9.18522 6.2679 9.31055 5.77734 9.31055 5.24023C9.31055 4.63867 9.19238 4.1123 8.95605 3.66113C8.71973 3.20996 8.34733 2.86263 7.83887 2.61914C7.33757 2.36849 6.68945 2.24316 5.89453 2.24316H2.79004V16.1865H0.716797V0.545898ZM9.8584 16.1865L6.05566 9.09668L8.21484 9.08594L12.0713 16.0576V16.1865H9.8584ZM19.1934 0.545898V16.1865H17.1523V0.545898H19.1934ZM24.2207 0.545898V2.24316H12.1357V0.545898H24.2207ZM36.0264 14.5V16.1865H28.2061V14.5H36.0264ZM28.6143 0.545898V16.1865H26.541V0.545898H28.6143Z"/>
      </svg>
    </>
  ) as HTMLElement;

  /** Default svg for collapsed settings icon */
  public static settingsCollapsedSVG: HTMLElement = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#1f1f1f" stroke="#1f1f1f" stroke-width=".5">
      {/* eslint-disable-next-line max-len */}
      <path d="m13.302.632.645 2.424.099.358.382.1a9.53 9.53 0 0 1 4.21 2.269l.278.263.382-.102 2.551-.684 1.305 2.115-1.915 1.734-.288.26.105.358c.218.766.326 1.53.326 2.273 0 .743-.108 1.507-.326 2.273l-.105.359.288.26 1.915 1.733-1.305 2.115-2.55-.684-.383-.102-.277.263a9.53 9.53 0 0 1-4.21 2.27l-.383.099-.099.358-.645 2.424h-2.604l-.645-2.424-.099-.358-.382-.1a9.53 9.53 0 0 1-4.21-2.269l-.278-.263-.382.102-2.551.684-1.305-2.115 1.915-1.734.288-.26-.105-.358A8.326 8.326 0 0 1 2.618 12c0-.743.108-1.507.326-2.273l.105-.359-.288-.26L.846 7.376 2.15 5.26l2.55.684.383.102.277-.263a9.53 9.53 0 0 1 4.21-2.27l.383-.099.099-.358.645-2.424h2.604ZM12 17.345c3.144 0 5.702-2.398 5.702-5.345 0-2.947-2.558-5.345-5.702-5.345S6.298 9.053 6.298 12c0 2.947 2.558 5.345 5.702 5.345ZM13.828 0h-3.656l-.776 2.901c-1.73.435-3.28 1.28-4.512 2.435l-3.056-.82L0 7.484l2.295 2.079A8.901 8.901 0 0 0 1.944 12c0 .845.126 1.658.35 2.438L0 16.515l1.828 2.968 3.056-.82c1.232 1.155 2.783 2 4.512 2.435L10.172 24h3.656l.776-2.901a10.23 10.23 0 0 0 4.512-2.434l3.056.819L24 16.516l-2.295-2.078c.221-.78.351-1.593.351-2.438 0-.842-.126-1.658-.35-2.434L24 7.486l-1.828-2.97-3.056.82A10.292 10.292 0 0 0 14.604 2.9L13.828 0ZM12 16.714c-2.775 0-5.028-2.112-5.028-4.714 0-2.602 2.253-4.714 5.028-4.714 2.775 0 5.028 2.112 5.028 4.714 0 2.602-2.253 4.714-5.028 4.714Z"/>
    </svg>
  ) as HTMLElement;

  /** Default svg for collapsed editor icon */
  public static editorCollapsedSVG: HTMLElement = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#1f1f1f" viewBox="0 0 34 20">
      {/* eslint-disable-next-line max-len */}
      <path d="m3.094 10.453 7.336 2.965v2.297L.844 11.273v-1.71l9.586-4.43V7.43l-7.336 3.023Zm11.191 9.012h-1.863L19.547.938h1.851l-7.113 18.527Zm17.133-9.082-7.746-3.035V5.12l10.008 4.43v1.71l-10.008 4.442v-2.25l7.746-3.07Z"/>
    </svg>
  ) as HTMLElement;

  /** Default svg for copy icon */
  public static get copySVG() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#5f5f5f" stroke-width="1.25">
      <rect width="12" height="15" x="4" y="3" fill="#fff" rx="2"/>
      <rect width="12" height="15" x="8" y="7" fill="#fff" rx="2"/>
    </svg> as HTMLElement;
  }

  public static get snippetSVG() {
    return <>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' viewBox='0 0 16 9' xmlSpace='preserve'>
        <polyline points='0,0 8,8 16,0' stroke-width='2'></polyline>
      </svg>
    </> as HTMLElement;
  }
}