#include lumi:shaders/lib/bump.glsl
#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumi:shaders/internal/ext_frag.glsl

/******************************************************
  lumicompat:shaders/material/lowsat_ore_metal.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
#if LUMI_MaterialCoverage == LUMI_MaterialCoverage_ApplyAll
#ifdef LUMI_PBR
  pbr_roughness = 0.7;
  vec3 c = data.spriteColor.rgb;
  float min_ = min( min(c.r, c.g), c.b );
  float max_ = max( max(c.r, c.g), c.b );
  float s = max_ > 0 ? (max_ - min_) / max_ : 0;
  if (s > 0.05 || min_ > 0.6) {
    pbr_roughness = 0.5;
    pbr_metallic = 1.0;
  }
#endif
#endif

#ifdef LUMI_BUMP
  _applyBump(data);
#endif
}
