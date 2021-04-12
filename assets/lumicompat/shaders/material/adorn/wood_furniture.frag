#include frex:shaders/api/fragment.glsl
#include frex:shaders/api/world.glsl
#include lumiext:shaders/lib/bump.glsl
#include lumiext:shaders/internal/frag.glsl

/******************************************************
  lumicompat:shaders/material/adorn/wood_furniture.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{  
  if (data.vertexColor.b * 0.8 > data.vertexColor.r) {
#ifdef LUMI_PBRX
    pbr_roughness = 0.1;
#endif
    vec3 desat = vec3(frx_luminance(data.vertexColor.rgb));
    data.vertexColor.rgb = mix(data.vertexColor.rgb, desat, 0.7);
    float maxc = max(data.spriteColor.r, max(data.spriteColor.g, data.spriteColor.b)); 
    data.spriteColor.rgb *= data.spriteColor.rgb * data.spriteColor.rgb * 2.0;
    // data.spriteColor.a = min(0.8, data.spriteColor.a);
  } else {
#ifdef LUMI_PBRX
    vec4 c = data.spriteColor;
    float min_ = min( min(c.r, c.g), c.b );
    float max_ = max( max(c.r, c.g), c.b );
    float s = max_ > 0 ? (max_ - min_) / max_ : 0;
    if (s < 0.2 || data.spriteColor.a < 0.8) {
        pbr_roughness = 0.1;
    }
#endif

#ifdef LUMI_BUMP
#ifdef LUMIEXT_ApplyBumpDefault
    _applyBump(data);
    // data.spriteColor.rgb *= (data.vertexNormal + 1) * 0.5;
#endif
#endif
  }
}
