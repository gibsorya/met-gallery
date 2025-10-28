import './style.css'

export default function LoadingSekelton() {
    const baseClasses = 'bg-loading min-h-20 block motion-safe:animate-pulse overflow-hidden object-cover relative rounded-lg w-full h-full'
    const portrait = 'gallery-item portrait'
    const landscape = 'gallery-item landscape'
    return (<div className="gallery-skeleton max-w-6xl grid w-full md:w-4/5">
        <div className={landscape}><div className={baseClasses} /></div>
        <div className={landscape}><div className={baseClasses} /></div>
        <div className={portrait}><div className={baseClasses} /></div>
        <div className={portrait}><div className={baseClasses} /></div>
        <div className={landscape}><div className={baseClasses} /></div>
        <div className={landscape}><div className={baseClasses} /></div>
        <div className={portrait}><div className={baseClasses} /></div>
        <div className={portrait}><div className={baseClasses} /></div>
        <div className={landscape}><div className={baseClasses} /></div>
        <div className={landscape}><div className={baseClasses} /></div>
        <div className={portrait}><div className={baseClasses} /></div>
        <div className={portrait}><div className={baseClasses} /></div>
        <div className={landscape}><div className={baseClasses} /></div>
        <div className={landscape}><div className={baseClasses} /></div>
        <div className={portrait}><div className={baseClasses} /></div>
        <div className={portrait}><div className={baseClasses} /></div>
    </div>)
}