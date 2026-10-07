import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const SECRET_KEY = 'Oletupolla'

export default function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminProjects, setAdminProjects] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true })
    if (data) {
      setAdminProjects(data)
    } else if (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    title: '',
    desc_fr: '',
    desc_es: '',
    desc_en: '',
    category: '',
    portfolioSection: 'active',
    historyCategory: 'none',
    isLegacy: false,
    featured: false,
    year: new Date().getFullYear().toString(),
    stack: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: ''
  })

  useEffect(() => {
    const key = window.prompt('Clé d\'accès requise / Access key required:')

    if (key === SECRET_KEY) {
      setIsAuthenticated(true)
      fetchProjects()
    } else {
      navigate('/')
    }
  }, [navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const resetForm = () => {
    setFormData({
      id: '', slug: '', title: '', desc_fr: '', desc_es: '', desc_en: '',
      category: '', portfolioSection: 'active', historyCategory: 'none',
      isLegacy: false, featured: false, year: new Date().getFullYear().toString(),
      stack: '', imageUrl: '', liveUrl: '', githubUrl: ''
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const updatePayload = {
        name: formData.title,
        category: formData.portfolioSection,
        descriptions: {
          es: formData.desc_es || "",
          en: formData.desc_en || "",
          fr: formData.desc_fr || ""
        },
        stack: formData.stack ? formData.stack.split(',').map(s => s.trim()).filter(Boolean) : [],
        image_url: formData.imageUrl || "",
        slug: formData.slug || "",
        year: formData.year || "",
        is_legacy: formData.isLegacy || false,
        is_featured: formData.featured || false,
        live_url: formData.liveUrl || "",
        github_url: formData.githubUrl || "",
        history_category: formData.historyCategory !== 'none' ? formData.historyCategory : null
      }

      let supabaseError = null;
      let rowsAffected = 0;

      if (editingId) {
        const { data, error } = await supabase.from('projects').update(updatePayload).eq('id', editingId).select()
        supabaseError = error
        rowsAffected = data ? data.length : 0;
      } else {
        const { data, error } = await supabase.from('projects').insert([updatePayload]).select()
        supabaseError = error
        rowsAffected = data ? data.length : 0;
      }

      if (supabaseError) {
        console.error('Error en Supabase:', supabaseError)
        alert('Error al actualizar: ' + supabaseError.message)
      } else if (rowsAffected === 0) {
        console.error('Fallo Silencioso: Ninguna fila fue modificada. Verifica las políticas RLS o si el ID es correcto.');
        alert('Fallo Silencioso: El comando se ejecutó sin errores, pero ninguna fila fue modificada. ¿Están configuradas las políticas RLS de UPDATE en Supabase?');
      } else {
        alert(editingId ? `¡Proyecto ${formData.title} actualizado!` : `¡Proyecto ${formData.title} guardado en la base de datos!`)
        resetForm()
        fetchProjects()
      }
    } catch (err: any) {
      console.error('Catch Error:', err)
      alert('Hubo un error inesperado al conectar: ' + err.message)
    }
  }

  const handleEdit = (project: any) => {
    setEditingId(project.id)
    setFormData({
      id: project.id,
      slug: project.slug || '',
      title: project.name || '',
      desc_fr: project.descriptions?.fr || '',
      desc_es: project.descriptions?.es || '',
      desc_en: project.descriptions?.en || '',
      category: '',
      portfolioSection: project.category || 'active',
      historyCategory: project.history_category || 'none',
      isLegacy: project.is_legacy || false,
      featured: project.is_featured || false,
      year: project.year || new Date().getFullYear().toString(),
      stack: Array.isArray(project.stack) ? project.stack.join(', ') : '',
      imageUrl: project.image_url || '',
      liveUrl: project.live_url || '',
      githubUrl: project.github_url || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este proyecto?")) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      setAdminProjects(adminProjects.filter(p => p.id !== id));
      alert("Proyecto eliminado con éxito.");
    } else {
      alert("Error al eliminar: " + error.message);
    }
  };

  const logout = () => {
    navigate('/')
  }

  if (!isAuthenticated) return null

  return (
    <div style={s.page}>
      <div className="container" style={s.container}>
        <div style={s.header}>
          <h1 style={s.title}>Panel de Administración</h1>
          <button onClick={logout} style={s.logoutBtn}>Cerrar Sesión</button>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-5">
            <h2 style={s.sectionTitle}>Datos Principales</h2>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label" style={s.label}>Nombre del Proyecto *</label>
                <input name="title" value={formData.title} onChange={handleChange} required className="form-control" style={s.input} placeholder="Ej: Super App" />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" style={s.label}>Slug</label>
                <input name="slug" value={formData.slug} onChange={handleChange} className="form-control" style={s.input} placeholder="ej: super-app" />
              </div>
              
              <div className="col-12 col-md-6">
                <label className="form-label" style={s.label}>Sección del Portfolio</label>
                <select name="portfolioSection" value={formData.portfolioSection} onChange={handleChange} className="form-select" style={s.input}>
                  <option value="active">Proyectos Activos</option>
                  <option value="history">Historial (Archivo)</option>
                  <option value="both">Ambos (Activos + Historial)</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" style={s.label}>Sub-filtro Historial</label>
                <select name="historyCategory" value={formData.historyCategory} onChange={handleChange} className="form-select" style={s.input}>
                  <option value="none">Ninguno</option>
                  <option value="apps">Apps</option>
                  <option value="webs">Webs</option>
                  <option value="misc">Miscelánea</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label" style={s.label}>Categoría General</label>
                <input name="category" value={formData.category} onChange={handleChange} className="form-control" style={s.input} placeholder="ex: web" />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" style={s.label}>Año</label>
                <input name="year" type="number" value={formData.year} onChange={handleChange} className="form-control" style={s.input} />
              </div>
            </div>
            
            <div className="row g-3 mt-2">
              <div className="col-12 col-md-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="isLegacy" checked={formData.isLegacy} onChange={handleChange} id="legacyCheck" />
                  <label className="form-check-label" style={{ color: 'var(--color-text)' }} htmlFor="legacyCheck">
                    Modo Legacy
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} id="featuredCheck" />
                  <label className="form-check-label" style={{ color: 'var(--color-text)' }} htmlFor="featuredCheck">
                    Destacado
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h2 style={s.sectionTitle}>Descripciones Trilingües</h2>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label" style={s.label}>Descripción (ES)</label>
                <textarea name="desc_es" value={formData.desc_es} onChange={handleChange} className="form-control" style={s.textarea} placeholder="Descripción en Español" rows={3} />
              </div>
              <div className="col-12">
                <label className="form-label" style={s.label}>Description (FR)</label>
                <textarea name="desc_fr" value={formData.desc_fr} onChange={handleChange} className="form-control" style={s.textarea} placeholder="Description en Français" rows={3} />
              </div>
              <div className="col-12">
                <label className="form-label" style={s.label}>Description (EN)</label>
                <textarea name="desc_en" value={formData.desc_en} onChange={handleChange} className="form-control" style={s.textarea} placeholder="Description in English" rows={3} />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 style={s.sectionTitle}>Tecnologías y Enlaces</h2>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label" style={s.label}>Tecnologías (separadas por comas)</label>
                <input name="stack" value={formData.stack} onChange={handleChange} className="form-control" style={s.input} placeholder="React, Node.js, MongoDB..." />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" style={s.label}>URL Imagen</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="form-control" style={s.input} placeholder="/assets/img/..." />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" style={s.label}>URL Live</label>
                <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="form-control" style={s.input} placeholder="https://..." />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" style={s.label}>URL GitHub</label>
                <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="form-control" style={s.input} placeholder="https://github.com/..." />
              </div>
            </div>
          </div>

          <div className="d-flex gap-3 mt-4">
            <button type="submit" className="btn w-100 py-3" style={s.submitBtn}>
              {editingId ? 'Actualizar Proyecto' : 'Guardar Proyecto'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn w-100 py-3" style={{ ...s.submitBtn, background: '#6c757d' }}>
                Cancelar Edición
              </button>
            )}
          </div>

        </form>

        <hr style={{ margin: '3rem 0', borderColor: 'var(--color-border)' }} />

        <div className="mt-5">
          <h2 style={s.sectionTitle}>Proyectos en Base de Datos</h2>
          {adminProjects.length === 0 ? (
            <p style={{ color: 'var(--color-muted)' }}>No hay proyectos todavía.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle" style={{ backgroundColor: 'var(--color-bg)' }}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {adminProjects.map(project => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>
                        <span className="badge bg-secondary">{project.category}</span>
                      </td>
                      <td className="text-end">
                        <button 
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(project)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(project.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--color-bg-dark)', color: 'var(--color-text)', padding: '3rem 1rem' },
  container: { maxWidth: '900px', margin: '0 auto', background: 'var(--color-surface)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '2rem' },
  title: { margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--color-heading)' },
  logoutBtn: { background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' },
  sectionTitle: { fontSize: '1.25rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' },
  label: { fontSize: '0.9rem', color: 'var(--color-muted)', fontWeight: 600, marginBottom: '0.4rem' },
  input: { padding: '0.7rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' },
  textarea: { padding: '0.7rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' },
  submitBtn: { background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, transition: 'background 0.3s' }
}
