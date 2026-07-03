export default function FormField({ label, ...props }) {
  return <label className="block text-sm font-medium text-charcoal">{label}<input {...props} className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-paprika" /></label>;
}
