// ~/utils/colorClasses.ts

export function getColorClasses(color: string, allowNoColor: boolean = false): string {
  const colorMap: Record<string, string> = {
    red: '!bg-red-500/20 !border-red-500/20 !text-red-500',
    schema: '!bg-red-500/10 !border-red-500/10 !text-white',
    green: '!bg-green-500/20 !border-green-500/20 !text-green-500',
    blue: '!bg-blue-500/20 !border-blue-500/20 !text-blue-500',
    primary: '!bg-primary-500/20 !border-primary-500/20 !text-primary-500',
    muted: '!bg-muted-500/20 !border-muted-500/20 !text-muted-500',
    snowy: '!bg-snowy-500/20 !border-snowy-500/20 !text-snowy-500',
    light: '!bg-light-500/20 !border-light-500/20 !text-light-500',
    dark: '!bg-dark-500/20 !border-dark-500/20 !text-dark-500',
    slate: '!bg-slate-500/20 !border-slate-500/20 !text-slate-500',
    gray: '!bg-gray-500/20 !border-gray-500/20 !text-gray-500',
    zinc: '!bg-zinc-500/20 !border-zinc-500/20 !text-zinc-500',
    hub: '!bg-hub-500/20 !border-hub-500/20 !text-hub-500',
    maroonFlush: '!bg-maroon-flush-500/20 !border-maroon-flush-500/20 !text-maroon-flush-500',
    endeavour: '!bg-endeavour-500/20 !border-endeavour-500/20 !text-endeavour-500',
    purple: '!bg-purple-500/20 !border-purple-500/20 !text-purple-500',
    violet: '!bg-violet-500/20 !border-violet-500/20 !text-violet-500',
    indigo: '!bg-indigo-500/20 !border-indigo-500/20 !text-indigo-500',
    sky: '!bg-sky-500/20 !border-sky-500/20 !text-sky-500',
    cyan: '!bg-cyan-500/20 !border-cyan-500/20 !text-cyan-500',
    teal: '!bg-teal-500/20 !border-teal-500/20 !text-teal-500',
    emerald: '!bg-emerald-500/20 !border-emerald-500/20 !text-emerald-500',
    lime: '!bg-lime-500/20 !border-lime-500/20 !text-lime-500',
    yellow: '!bg-yellow-500/20 !border-yellow-500/20 !text-yellow-500',
    amber: '!bg-amber-500/20 !border-amber-500/20 !text-amber-500',
    orange: '!bg-orange-500/20 !border-orange-500/20 !text-orange-500',
    gold: '!bg-gold-500/20 !border-gold-500/20 !text-gold-500',
    bronze: '!bg-bronze-500/20 !border-bronze-500/20 !text-bronze-500',
    brown: '!bg-brown-500/20 !border-brown-500/20 !text-brown-500',
    chocolate: '!bg-chocolate-500/20 !border-chocolate-500/20 !text-chocolate-500',
    coffee: '!bg-coffee-500/20 !border-coffee-500/20 !text-coffee-500',
    khaki: '!bg-khaki-500/20 !border-khaki-500/20 !text-khaki-500',
    olive: '!bg-olive-500/20 !border-olive-500/20 !text-olive-500',
    limeGreen: '!bg-lime-green-500/20 !border-lime-green-500/20 !text-lime-green-500',
    forest: '!bg-forest-500/20 !border-forest-500/20 !text-forest-500',
    mint: '!bg-mint-500/20 !border-mint-500/20 !text-mint-500',
    tealGreen: '!bg-teal-green-500/20 !border-teal-green-500/20 !text-teal-green-500',
    aqua: '!bg-aqua-500/20 !border-aqua-500/20 !text-aqua-500',
    turquoise: '!bg-turquoise-500/20 !border-turquoise-500/20 !text-turquoise-500',
    cerulean: '!bg-cerulean-500/20 !border-cerulean-500/20 !text-cerulean-500',
    skyBlue: '!bg-sky-blue-500/20 !border-sky-blue-500/20 !text-sky-blue-500',
    success: '!bg-success-500/20 !border-success-500/20 !text-success-500',
  };

  // If allowNoColor is true and color is not found, return an empty string
  if (allowNoColor && !colorMap[color]) {
    return '';
  }

  // Default to primary color if color is not found
  return colorMap[color] || '!bg-slate-500/20 !border-slate-500/20 !text-slate-500';
}
