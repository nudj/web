import { variables } from '../../lib/css'

export default (colourName = 'charcoal') => {
  const colour = variables.colours[colourName] || variables.colours.charcoal

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="0 0 77 101">
      <defs>
          <path id="a" d="M26.455.242v77.481H.574V.243h25.881z"/>
      </defs>
      <g fill="none" fill-rule="evenodd">
          <path fill="${colour}" d="M31.782 78.314c1.787-.171 2.512-1.033 3.684-1.751.283.723 1.305 1.847 2.126 1.847 1.069 0 2.417-1.028 2.417-2.25 0-2.967-.487-2.967-.487-5.936 0-12.014-.52-11.49.027-24.029.367-8.417.069-8.425.069-16.85 0-1.076-.673-1.726-2.026-2.012-1.047-.222-2.078.936-2.078 2.011 0 8.426.021 8.334.021 16.76 0 12.014-.354 12.106-.354 24.12 0 2.146-1.264 3.382-3.399 3.382s-3.102-1.237-3.18-3.382c-.329-9.109-.855-14.918-.913-19.582-.071-5.923.415-9.642.87-19.873.049-1.075-.49-3.616-2.587-3.616-1.069 0-1.813 1.116-1.813 2.191 0 20.44.078 20.44.078 40.88 0 4.294 3.293 8.5 7.545 8.09M52.202 28.177c.138-2.143.918-3.395 3.054-3.395 2.135 0 3.877 1.562 3.877 3.708 0 5.458-.237 5.15.025 10.6.621 13.028-.58 11.935-.195 23.853.07 2.146-1.572 3.301-3.707 3.301-2.136 0-3.098-1.592-3.098-3.738 0-17.52-.913-19.353.044-34.33m2.557 42.677c1.73.17 3.375.172 4.555-.557.301.68.962 1.98 1.751 1.98 1.071 0 2.035-1.04 2.035-2.115 0-2.92.624-5.337.624-8.257 0-12.063-.096-10.751-.096-22.814 0-5.457.355-5.81.355-11.267 0-12.654-.447-13.284-.447-25.937 0-1.075-1.4-1.886-2.47-1.886-1.069 0-1.635.81-1.635 1.886 0 9.287.802 10.323.212 19.59-1.141-.664-2.975-1.522-4.387-1.522-4.271 0-7.484 3.931-7.621 8.223-.528 16.396.264 17.52.264 35.039 0 4.293 2.609 7.218 6.86 7.637M51.057 94.538c-.2-.174-.374-.325-.637-.72a.423.423 0 0 0-.588-.118.43.43 0 0 0-.117.59c.328.492.573.703.788.89.201.176.375.326.638.722a.427.427 0 0 0 .588.117.427.427 0 0 0 .116-.59c-.328-.491-.572-.704-.788-.891M47.249 95.46a.434.434 0 0 0-.415-.451c-.22-.019-.44.176-.447.417-.05 1.28.153 1.937.349 2.574.182.593.355 1.152.312 2.284-.01.241.176.442.414.451h.017a.432.432 0 0 0 .43-.417c.05-1.281-.153-1.94-.35-2.574-.18-.593-.354-1.153-.31-2.285M44.195 80.318c.135.642.273 1.305.812 2.49a.448.448 0 1 0 .813-.375c-.496-1.093-.618-1.68-.75-2.3-.133-.641-.273-1.304-.811-2.489a.445.445 0 0 0-.592-.222.45.45 0 0 0-.221.597c.497 1.093.619 1.679.75 2.3M43.603 95.076c-.407.517-.555.844-.688 1.134-.12.267-.235.52-.577.955a.439.439 0 0 0 .34.707.435.435 0 0 0 .34-.166c.406-.518.556-.845.687-1.135.121-.267.238-.52.579-.955a.439.439 0 0 0-.072-.613.433.433 0 0 0-.61.073M48.367 77.513c-.28.6-.35.954-.413 1.267-.057.29-.11.563-.347 1.067a.438.438 0 0 0 .394.624c.163 0 .32-.093.394-.25.28-.602.35-.956.413-1.269a3.96 3.96 0 0 1 .348-1.067.438.438 0 0 0-.21-.582.435.435 0 0 0-.58.21"/>
          <path fill="${colour}" d="M44.08 86.317c-.223-.707-.478-1.077-1.044-1.086-.527-.01-.87-.047-1.436.307-1.85 1.221-3.125 1.79-4.176 2.19-1.824.67-3.16 1.527-4.201 2.133-2.543 1.48-5.006 3.182-10.382 3.768-2.67.29-3.814-.519-5.595-2.052-.947-.816-1.649-1.992-1.875-4.537-.54-6.071.479-21.218.479-43.126 0-4.257-3.354-7.243-7.49-7.438-1.528-.075-2.965-.215-4.24.537-.114-1.02-1.046-2.17-2.114-2.178-.958-.007-1.538.672-1.482 1.604C.748 40.262.23 40.469.23 43.9c0 3.943-.231 3.79-.231 7.732C0 68.29.85 68.129.833 85.109c-.001.75.568 1.422 1.315 1.442 1.088.03 2.931-.424 2.915-1.984-.162-16.772-.561-16.513-.774-33.009-.036-2.827-1.009-8.976.443-10.552.725-.788 2.41-.712 3.486-.798 2.42-.194 3.368 2.118 3.454 4.256 1.06 26.216-1.047 22.934-.952 41.653.015 2.89 1.222 7.419 3.522 9.152 1.575 1.186 4.441 1.802 6.526 1.707.85-.04 1.614 0 2.698-.192 6.966-1.24 7.64-3.42 11.474-4.492.01-.003 1.34-.26 2.05-.02.187.08.388.171.618.296 1.309.703 2.06.374 3.023.177.962-.198.95-.137 1.798-.03 1.57.203 1.831.236 2.496-.142.256-.144.484-.667.224-1.088a.232.232 0 0 0-.229-.101c-.991.155-1.643.152-2.061.124-.463-.032-1.222.053-1.696-.492a.13.13 0 0 0-.17-.024c-.311.198-.515.223-1 .34-.604.146-1.573-.068-1.583-.224-.027-.438.618.14 1.529-.09.604-.151 1.052-.64 1.335-1.016.465-.618.53-.852.513-1.324-.019-.46.215-1.07.448-.983.234.089-.1.638.126.732.234.098.371-.465.595-.377.302.118.156.167.186.45.018.162.155.404.43.6.167.118.458.206.596.285.266.153.24.46-.008.47-.266.009-.898-.705-1.045-.576-.193.167.266.484-.006.558-.343.096-.313-.375-.836-.262-.16.034-.36.189-.51.38-.197.254-.31.572-.137.769.302.344.69.227 1.269.275.518.043 1.379.206 2.297-.09.643-.24 1.362-.518.853-1.522-.923-1.83-1.64-2.031-1.966-3.07M73.45 9.407c1.214 0 1.91-.377 2.288-1.537.346-1.06.18-1.928-.021-2.557-.372-1.161-1.054-1.5-2.268-1.5-1.213 0-2.279 1.132-2.279 2.352 0 .443.122.904.132 1.184.048 1.219.935 2.058 2.149 2.058M51.615 87.116c.1-.359-.283-.48-.542-.974-.044-.085-.412.076-.505.098-.418.11-.92.136-1.563.357-.337.143-.98.389-.624 1.236.127.305.394.374.757.346.502-.04 2.39-.744 2.477-1.063M50.756 85.454c.077-.148-.343-.794-.464-1.513-.009-.063-.071-.1-.134-.087-3.126.673-2.49 1.417-2.368 2.108.051.298.35.29.436.294.78-.015 2.425-.593 2.53-.802M50.073 89.843c1.033-.192 2.98-.68 3.058-1.138.055-.329-.128-.808-.595-.943-.67-.191-3.147.762-3.318.986-.173.225-.181.293-.067.557.121.285.486.513.616.548.06.016.213.008.306-.01M52.57 89.649c-.61.247-2.718.22-2.513 1.15.084.382.722.736 2.331.099.237-.093.49-.202.77-.283a.395.395 0 0 0 .274-.286.643.643 0 0 0-.107-.578c-.224-.306-.256-.303-.756-.102"/>
          <g transform="translate(50.237 12.696)">
              <mask id="b" fill="#fff">
                  <use xlink:href="#a"/>
              </mask>
              <path fill="${colour}" d="M26.4 32.034c0-7.35-.253-7.35-.253-14.7 0-7.351-1.136-7.353-.998-14.702.03-1.629-.34-2.949-2.365-2.15-1.255.495-2.298 1.753-2.372 3.105-.345 6.171.96 7.135 1.047 14.152.082 6.801.348 7.537.348 14.886 0 7.35-.233 6.755-.233 14.107 0 7.345.019 7.254.019 14.59 0 2.36-1.663 4.63-3.599 5.629-1.261.65-2.598 1.208-4.341 1.904-4.82 1.816-6.464 1.742-6.973 1.608-.066-.026-.133-.053-.198-.084l-.008-.005v.003c-.444-.202-.89-.512-1.333-.965-.952-.974-3.557-.074-4.245.637-.718.745-.07 1.903.341 2.642.796 1.435.336 1.897.942 1.756.452-.105.916-.53.672-1.485-.34-1.341-.917-1.557-.762-1.782.26-.378.503.316.896 1.016.032.056.063.203.161.141.126-.081.747-1.127.837-1.482.102-.406.26-.215.173.018-.07.19-.469 1.267-.599 1.556-.11.242.07.335.147.33.212-.026.684-.195.834-.306.242-.177.3-.026.166.118-.061.065-.409.484-1.08.66-.277.074-.35.45-.326.749.043.487.262.778.961 1.178 1.22.698 1.976.329 1.986.608.008.2-.612.252-1.502.08-1.024-.2-1.254-.903-1.453-.68-.247.278.219.318.226.711.008.29-.2.258-.076.62.125.365.223.308.263.478.05.214.034.331.001.583a.145.145 0 0 0 .183.16c1.46-.393 2.994-.744 3.622-1.742.693-1.106.878-1.971 3.108-2.816.062-.02.126-.043.19-.059 2.079-.547 3.258-1.32 8.1-3.2 3.657-1.42 6.732-4.944 6.75-8.883.029-6.938.8-7.076.8-14.284 0-7.35-.057-7.35-.057-14.7" mask="url(#b)"/>
          </g>
      </g>
  </svg>`
}
